import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { createProfileAction } from "@/utils/actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function CreateProfilePage() {
  const user = await currentUser();
  if (user?.privateMetadata?.hasProfile) redirect("/");

  return (
    <section className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <div className="max-w-2xl w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-center text-[hsl(var(--primary-foreground))] mb-6">
          Create Your Profile
        </h1>
        <p className="text-center text-lg text-[hsl(var(--muted-foreground))] mb-8">
          Welcome! Let’s get started by setting up your profile.
        </p>
        <FormContainer action={createProfileAction}>
          <div className="grid gap-6">
            <FormInput
              type="text"
              name="firstName"
              label="First Name"
              // className="bg-[hsl(var(--input))] text-[hsl(var(--foreground))]"
            />
            <FormInput
              type="text"
              name="lastName"
              label="Last Name"
              // className="bg-[hsl(var(--input))] text-[hsl(var(--foreground))]"
            />
            <FormInput
              type="text"
              name="username"
              label="Username"
              // className="bg-[hsl(var(--input))] text-[hsl(var(--foreground))]"
            />
          </div>
          <SubmitButton
            className="mt-8 w-full py-3 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold text-lg rounded-md shadow-md hover:bg-[hsl(var(--secondary))] transition-all"
            text="Create Profile"
          />
        </FormContainer>
      </div>
    </section>
  );
}

export default CreateProfilePage;