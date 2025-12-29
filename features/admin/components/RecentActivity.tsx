import { prisma } from "@/lib/prisma";
import { UserPlus, FileText } from "lucide-react";
import { formatDate } from "@/lib/utils/date";

type ActivityType = "USER_JOINED" | "CV_CREATED";

interface Activity {
    id: string;
    type: ActivityType;
    primaryText: string;
    secondaryText: string;
    date: Date;
    icon: React.ReactNode;
}

async function getRecentActivities(): Promise<Activity[]> {
    const [users, cvs] = await Promise.all([
        prisma.user.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            select: { id: true, name: true, email: true, createdAt: true },
        }),
        prisma.cV.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            include: { user: { select: { name: true, email: true } } }
        })
    ]);

    const activities: Activity[] = [
        ...users.map((u) => ({
            id: `user-${u.id}`,
            type: "USER_JOINED" as ActivityType,
            primaryText: "Nouvel utilisateur",
            secondaryText: `${u.name || "Sans nom"} (${u.email})`,
            date: u.createdAt,
            icon: <UserPlus className="h-4 w-4 text-white" />,
        })),
        ...cvs.map((c) => ({
            id: `cv-${c.id}`,
            type: "CV_CREATED" as ActivityType,
            primaryText: "Nouveau CV créé",
            secondaryText: `"${c.title}" par ${c.user.name || c.user.email}`,
            date: c.createdAt,
            icon: <FileText className="h-4 w-4 text-white" />,
        })),
    ];

    return activities
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 10);
}

export async function RecentActivity() {
    const activities = await getRecentActivities();

    if (activities.length === 0) {
        return <p className="text-gray-500 text-sm">Aucune activité récente.</p>;
    }

    return (
        <div className="flow-root">
            <ul role="list" className="-mb-8">
                {activities.map((activity, activityIdx) => (
                    <li key={activity.id}>
                        <div className="relative pb-8">
                            {activityIdx !== activities.length - 1 ? (
                                <span
                                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                                    aria-hidden="true"
                                />
                            ) : null}
                            <div className="relative flex space-x-3">
                                <div>
                                    <span
                                        className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-800 ${activity.type === "USER_JOINED"
                                                ? "bg-indigo-500"
                                                : "bg-green-500"
                                            }`}
                                    >
                                        {activity.icon}
                                    </span>
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {activity.primaryText}{" "}
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {activity.secondaryText}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="text-right text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                                        <time dateTime={activity.date.toISOString()}>
                                            {formatDate(activity.date)}
                                        </time>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
