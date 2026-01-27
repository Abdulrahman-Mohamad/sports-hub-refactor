import type { FieldValues, Path, UseFormSetValue } from "react-hook-form";

export default function handleSingleFileChange<T extends FieldValues>(
  e: React.ChangeEvent<HTMLInputElement>,
  setSelectedFiles: React.Dispatch<React.SetStateAction<string | null>>,
  setValue: UseFormSetValue<T>,
  name: Path<T>
) {
  const file = Array.from(e.target.files ?? [])[0];
  if (!file) return;

  // ✅ optional validation
  if (!file.type.startsWith("image/")) {
    alert("Please select a valid image file.");
    return;
  }

  const fileURL = URL.createObjectURL(file);

  // ✅ update preview
  setSelectedFiles(fileURL);

  // ✅ update form state
  // react-hook-form expects value types matching your schema
  setValue(name, file as any);
}
