"use server";

//data sent from client to server in airport checklist
export async function SubmitData(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  console.log(rawFormData);
}
