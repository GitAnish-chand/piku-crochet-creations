import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Package, Tags, ArrowUpRight, Loader2, IndianRupee, Eye, Users } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { API_URL } from '@/config/api';

const Dashboard = () => {
    const [stats, setStats] = useState({ totalProducts: 0, totalCategories: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchStats = async () => {
            try {
                // Ensure auth check is completed before calling stats endpoint to avoid unnecessary 401s if token is refreshed
                const res = await fetch(`${API_URL}/stats`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch stats');
                }

                const data = await res.json();

                if (isMounted) {
                    setStats(data);
                }
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
                if (isMounted) {
                    toast.error('Failed to load dashboard statistics');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchStats();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Products
                        </CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {isLoading ? '...' : stats.totalProducts}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Products available in store
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Categories
                        </CardTitle>
                        <Tags className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {isLoading ? '...' : stats.totalCategories}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Active categories on store
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
