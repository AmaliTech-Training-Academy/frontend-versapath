import { ProfileForm } from "../profile/components/profile-form";

export default async function ProfilePage() {
  return (
  
      <section className="grid grid-cols-4 gap-6 p-5 rounded-xl">
        <ProfileForm />
      </section>
  );
}
