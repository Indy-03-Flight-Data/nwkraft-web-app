'use server';

export async function searchForm(formData: FormData){
    const rawFormData =  Object.fromEntries(formData.entries());

    console.log(rawFormData)
}
