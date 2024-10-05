"use server";

export async function SubmitData(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  console.log(rawFormData);
}
