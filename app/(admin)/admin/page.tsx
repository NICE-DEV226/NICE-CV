import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { Users, FileText, TrendingUp, DollarSign } from "lucide-react";
import { StatsCard } from "@/features/admin/components/StatsCard";
import { RecentActivity } from "@/features/admin/components/RecentActivity";

async function getStats() {
    const userCount = await prisma.user.count();
    const cvCount = await prisma.cV.count();
    const premiumUsers = await prisma.user.count({
        where: { plan: "PREMIUM" },
    });

    const mrr = premiumUsers * 9.99;

    return { userCount, cvCount, premiumUsers, mrr };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Dashboard Overview
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Utilisateurs"
                    value={stats.userCount}
                    icon={<Users className="h-6 w-6 text-indigo-600" />}
                />
                <StatsCard
                    title="Total CVs"
                    value={stats.cvCount}
                    icon={<FileText className="h-6 w-6 text-green-600" />}
                />
                <StatsCard
                    title="Utilisateurs Premium"
                    value={stats.premiumUsers}
                    icon={<TrendingUp className="h-6 w-6 text-purple-600" />}
                />
                <StatsCard
                    title="Revenu Mensuel Est."
                    value={`${stats.mrr.toFixed(2)} €`}
                    icon={<DollarSign className="h-6 w-6 text-yellow-600" />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                            Activités Récentes
                        </h3>
                        <RecentActivity />
                    </div>
                </Card>

                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                            Répartition des Formules
                        </h3>
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <span className="text-gray-600 dark:text-gray-300">Gratuit</span>
                            <span className="font-bold">{stats.userCount - stats.premiumUsers}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg mt-2">
                            <span className="text-indigo-600 dark:text-indigo-300 font-medium">Premium</span>
                            <span className="font-bold text-indigo-600">{stats.premiumUsers}</span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
