import { SkillAtom } from "../types/skill-atom";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;
export async function fetchAtoms() {
  const res = await fetch(`${API_BASE}/atoms`, {
    headers: {
      // Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch atoms");
  }
  const data = await res.json();
  return data.data.items;
}

export async function createAtom(
  atom: { name: string; description: string; objectives: string; estimatedHours: number; status: string; }
) {
  try {
    const res = await fetch(`${API_BASE}/atoms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(atom),
    });

    if (!res.ok) throw new Error("Failed to create lesson");

    const data = await res.json();
    return data.data.item as SkillAtom;
  } catch (err) {
    console.error("Error creating atom:", err);
    return null;
  }
}

export async function deleteAtom(id: string) {
  const res = await fetch(`${API_BASE}/atoms/${id}`, {
    method: "DELETE",
    headers: {
      // Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete atom");
  }

  return await res.json();
}

export async function updateAtom(id: string, payload: unknown) {
  try {
    const res = await fetch(`${API_BASE}/atoms/${id}`, {
      method: "PATCH",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(errorBody?.message || "Failed to update atom");
    }

    const data = await res.json();
    return data?.data?.item;
  } catch (err) {
    console.error("Failed to update atom:", err as unknown);
    throw err;
  }
}
