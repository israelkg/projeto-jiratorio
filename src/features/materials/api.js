import { api } from "@/lib/api";

export async function uploadMaterial(file, { name } = {}) {
  const form = new FormData();
  form.append("file", file);
  if (name) form.append("name", name);

  const { data } = await api.post("/materials", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function listMaterials() {
  const { data } = await api.get("/materials");
  return data;
}

export async function getMaterial(id) {
  const { data } = await api.get(`/materials/${id}`);
  return data;
}

export async function deleteMaterial(id) {
  await api.delete(`/materials/${id}`);
}
