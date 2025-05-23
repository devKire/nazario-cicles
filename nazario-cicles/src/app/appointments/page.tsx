"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Appointment {
  id: string;
  name: string;
  phone: string;
  datetime: string;
  notes: string;
  service: string;
  status: "PENDING" | "CONFIRMED" | "CANCELED";
}

export default function AppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/appointments?search=${encodeURIComponent(
          search
        )}&status=${status}`
      );
      if (!res.ok) throw new Error("Falha ao buscar agendamentos");
      const data = await res.json();
      setAppointments(data);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
      showToast("Erro ao carregar agendamentos", "error");
    } finally {
      setLoading(false);
    }
  }

  function showToast(message: string, type: "success" | "error") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function updateStatus(id: string, newStatus: Appointment["status"]) {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
      showToast("Status atualizado com sucesso!", "success");
      fetchAppointments();
    } catch {
      showToast("Erro ao atualizar status", "error");
    }
  }

  async function deleteAppointment(id: string) {
    if (!confirm("Tem certeza que deseja excluir este agendamento?")) return;
    try {
      const res = await fetch(`/api/appointments/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      showToast("Agendamento excluído com sucesso!", "success");
      fetchAppointments();
    } catch {
      showToast("Erro ao excluir agendamento", "error");
    }
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleRefresh = () => {
    fetchAppointments(); // Atualiza a lista
    router.refresh(); // Opcional, para garantir dados do servidor atualizados
  };
  return (
    <div className="p-4">
      {toast && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow text-white ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">Agendamentos</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar por nome ou telefone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="ALL">Todos</option>
          <option value="PENDING">Pendente</option>
          <option value="CONFIRMED">Confirmado</option>
          <option value="CANCELED">Cancelado</option>
        </select>
        <button
          onClick={fetchAppointments}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Buscar
        </button>
        <button
          onClick={handleRefresh}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          title="Atualizar página"
        >
          🔃
        </button>
      </div>

      {loading ? (
        <div role="status" className="space-y-2 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      ) : (
        <ul className="space-y-2">
          {appointments.length === 0 && <p>Nenhum agendamento encontrado.</p>}
          {appointments.map((appt) => (
            <li
              key={appt.id}
              className="border p-4 rounded flex flex-col gap-1"
            >
              <p>👤 {appt.name}</p>
              <p>📞 {appt.phone}</p>
              <p>📝 {appt.notes}</p>
              <p>🛠️ {appt.service}</p>
              <p>📅 {new Date(appt.datetime).toLocaleString()}</p>
              <p>Status: {appt.status}</p>
              <div className="flex gap-2 mt-2">
                {appt.status !== "CONFIRMED" && (
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={() => updateStatus(appt.id, "CONFIRMED")}
                  >
                    Confirmar
                  </button>
                )}
                {appt.status !== "CANCELED" && (
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    onClick={() => updateStatus(appt.id, "CANCELED")}
                  >
                    Cancelar
                  </button>
                )}
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  onClick={() => deleteAppointment(appt.id)}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
