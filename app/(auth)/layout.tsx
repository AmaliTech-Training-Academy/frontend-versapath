export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="h-screen w-screen bg-base-white sm:bg-[url(/images/auth-background.jpg)] bg-cover bg-no-repeat bg-bottom flex items-center justify-center">
            {children}
        </main>
    );
}