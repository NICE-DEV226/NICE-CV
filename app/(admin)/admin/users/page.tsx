import { prisma } from "@/lib/prisma";
import { UsersTable } from "@/features/admin/components/UsersTable";

export default async function UsersPage() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        take: 50,
        include: {
            _count: {
                select: { cvs: true },
            },
        },
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Gestion des Utilisateurs
                </h1>
            </div>

            <UsersTable users={users} />
        </div>
    );
}
