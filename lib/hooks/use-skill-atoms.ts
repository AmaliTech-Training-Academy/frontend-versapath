import { useEffect, useState } from "react";
import { fetchAtoms } from "@/lib/api/skill-atom-api";
import { SkillAtom } from "@/lib/types/skill-atom";

export function useSkillAtoms() {
  const [skillAtoms, setSkillAtoms] = useState<SkillAtom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshLessons = async () => {
    setLoading(true);
    try {
      const data = await fetchAtoms();
      setSkillAtoms(data);
    } catch (err) {
      setError("Failed to load lessons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshLessons();
  }, []);

  return { skillAtoms, loading, error, refreshLessons, setSkillAtoms };
}
