import { apiFetch } from "../apiFetch";

export const deleteImageFetch = async () => {
  try {
    const res = await apiFetch('/profile/delete-image', {
      method: 'DELETE',
    });
    return res;
  } catch (error) {
    console.error("Delete Image Fetch Error:", error);
    throw error;
  }
};
