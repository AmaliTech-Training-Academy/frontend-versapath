import Image from "next/image";

export const EmptyState = ({ message }: { message: string }) => {
    return (
        <>
            <Image
                src="/not-found.png"
                alt={message}
                height={100}
                width={100}
            />
            <span className="text-sm text-[#525252] items-center">{message}</span>
        </>
    );
}