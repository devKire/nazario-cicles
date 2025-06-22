"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-select";
import { useEffect, useState } from "react";
import { format, toZonedTime } from "date-fns-tz";

interface Availability {
  id: number;
  startDateTime: string;
  endDateTime: string;
  isBooked: boolean;
}

export default function AvailabilityPage() {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [singleDate, setSingleDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bulkDate, setBulkDate] = useState("");
  const [startOfDay, setStartOfDay] = useState("");
  const [endOfDay, setEndOfDay] = useState("");
  const [duration, setDuration] = useState(30);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filterDate, setFilterDate] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    fetchAvailabilities(filterDate);
  }, [filterDate]);

  function toggleSelect(id: number) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  }

  async function deleteSelected() {
    if (selectedIds.length === 0) return;
    if (!confirm(`Deseja excluir ${selectedIds.length} horários?`)) return;

    try {
      await Promise.all(
        selectedIds.map((id) =>
          fetch(`/api/availability/${id}`, { method: "DELETE" })
        )
      );
      setSelectedIds([]);
      fetchAvailabilities(filterDate);
    } catch (error) {
      console.error("Erro ao excluir horários", error);
    }
  }

  async function fetchAvailabilities(dateFilter?: string) {
    const url = dateFilter
      ? `/api/availability?date=${dateFilter}`
      : "/api/availability";
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      setAvailabilities(data);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!singleDate || !startTime || !endTime) return;
    if (startTime >= endTime) return;

    const startDateTime = new Date(`${singleDate}T${startTime}`).toISOString();
    const endDateTime = new Date(`${singleDate}T${endTime}`).toISOString();

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `/api/availability/${editingId}`
      : "/api/availability";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ startDateTime, endDateTime }),
    });

    if (res.ok) {
      resetForm();
      fetchAvailabilities(filterDate);
    }
  }

  async function createMultipleAvailabilities(e: React.FormEvent) {
    e.preventDefault();
    if (!bulkDate || !startOfDay || !endOfDay) return;
    if (startOfDay >= endOfDay) return;
    if (duration < 5) return;

    const res = await fetch("/api/availability/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: bulkDate, startOfDay, endOfDay, duration }),
    });

    if (res.ok) {
      resetForm();
      fetchAvailabilities(filterDate);
    }
  }

  function handleEdit(a: Availability) {
    const start = new Date(a.startDateTime);
    const end = new Date(a.endDateTime);

    setSingleDate(start.toISOString().slice(0, 10));
    setStartTime(start.toTimeString().slice(0, 5));
    setEndTime(end.toTimeString().slice(0, 5));
    setEditingId(a.id);
  }

  async function deleteAvailability(id: number) {
    if (!confirm("Excluir este horário?")) return;

    const res = await fetch(`/api/availability/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchAvailabilities(filterDate);
    }
  }

  function resetForm() {
    setSingleDate("");
    setStartTime("");
    setEndTime("");
    setEditingId(null);
    setBulkDate("");
    setStartOfDay("");
    setEndOfDay("");
    setDuration(30);
  }

  function formatDateWithoutTimezone(dateString: string) {
    const zoned = toZonedTime(dateString, "America/Sao_Paulo");
    return format(zoned, "dd/MM/yyyy");
  }

  function formatTime(dateString: string) {
    const zoned = toZonedTime(dateString, "America/Sao_Paulo");
    return format(zoned, "HH:mm");
  }

  return (
    <div className="p-8 max-w-xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold">
        {editingId ? "Editar" : "Criar"} Horário
      </h1>

      <Card>
        <CardContent className="space-y-4 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="singleDate">Data</Label>
                <Input
                  id="singleDate"
                  type="date"
                  value={singleDate}
                  onChange={(e) => setSingleDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="startTime">Início</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endTime">Fim</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit">{editingId ? "Atualizar" : "Salvar"}</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-semibold">Criar Múltiplos</h2>
          <form
            onSubmit={createMultipleAvailabilities}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div>
              <Label htmlFor="bulkDate">Data</Label>
              <Input
                id="bulkDate"
                type="date"
                value={bulkDate}
                onChange={(e) => setBulkDate(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="startOfDay">Início</Label>
              <Input
                id="startOfDay"
                type="time"
                value={startOfDay}
                onChange={(e) => setStartOfDay(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="endOfDay">Fim</Label>
              <Input
                id="endOfDay"
                type="time"
                value={endOfDay}
                onChange={(e) => setEndOfDay(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="duration">Duração (min)</Label>
              <Input
                id="duration"
                type="number"
                min={5}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                required
              />
            </div>
            <Button type="submit">Criar</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-semibold">Filtrar</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setFilterDate(filterDate);
            }}
            className="flex gap-2"
          >
            <Input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
            <Button type="submit">Filtrar</Button>
          </form>
        </CardContent>
      </Card>

      <Separator />

      <div className="space-y-4">
        <Button
          variant="destructive"
          onClick={deleteSelected}
          disabled={selectedIds.length === 0}
        >
          Excluir Selecionados ({selectedIds.length})
        </Button>

        {availabilities.map((a) => (
          <Card
            key={a.id}
            className={selectedIds.includes(a.id) ? "bg-red-100" : ""}
          >
            <CardContent className="flex justify-between items-center p-4">
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={selectedIds.includes(a.id)}
                  onCheckedChange={() => toggleSelect(a.id)}
                />
                <div>
                  <p>
                    <strong>Data:</strong>{" "}
                    {formatDateWithoutTimezone(a.startDateTime)}
                  </p>
                  <p>
                    <strong>Início:</strong> {formatTime(a.startDateTime)}
                  </p>
                  <p>
                    <strong>Fim:</strong> {formatTime(a.endDateTime)}
                  </p>
                  <p>
                    <strong>Reservado:</strong> {a.isBooked ? "Sim" : "Não"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleEdit(a)}>
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteAvailability(a.id)}
                >
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
