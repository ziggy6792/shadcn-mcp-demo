"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Search, Filter, AlertCircle, Clock, MessageSquare, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MagicCard } from "@/components/ui/magic-card";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { mockIssues } from "@/lib/mock-data";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { cn } from "@/lib/utils";

const priorityColors = {
  low: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  high: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  critical: "bg-red-500/10 text-red-500 border-red-500/20",
};

export default function IssuesPage() {
  const params = useParams();
  const repoName = params.name as string;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);

  const allLabels = Array.from(
    new Set(mockIssues.flatMap((issue) => issue.labels))
  );

  const filteredIssues = mockIssues.filter((issue) => {
    const matchesSearch =
      searchQuery === "" ||
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLabels =
      selectedLabels.length === 0 ||
      selectedLabels.some((label) => issue.labels.includes(label));

    const matchesPriority =
      selectedPriorities.length === 0 ||
      selectedPriorities.includes(issue.priority);

    return matchesSearch && matchesLabels && matchesPriority;
  });

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="lg:pl-64 pt-16">
        <main className="p-8">
          <BlurFade delay={0.1} inView>
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">{repoName}</h1>
              <p className="text-muted-foreground">
                Browse and manage issues for this repository
              </p>
            </div>
          </BlurFade>

          {/* Filters and Search */}
          <BlurFade delay={0.15} inView>
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search issues..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Labels
                        {selectedLabels.length > 0 && (
                          <Badge variant="secondary" className="ml-1">
                            {selectedLabels.length}
                          </Badge>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Filter by labels</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {allLabels.map((label) => (
                        <DropdownMenuCheckboxItem
                          key={label}
                          checked={selectedLabels.includes(label)}
                          onCheckedChange={(checked) => {
                            setSelectedLabels(
                              checked
                                ? [...selectedLabels, label]
                                : selectedLabels.filter((l) => l !== label)
                            );
                          }}
                        >
                          {label}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Priority
                        {selectedPriorities.length > 0 && (
                          <Badge variant="secondary" className="ml-1">
                            {selectedPriorities.length}
                          </Badge>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Filter by priority</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {["low", "medium", "high", "critical"].map((priority) => (
                        <DropdownMenuCheckboxItem
                          key={priority}
                          checked={selectedPriorities.includes(priority)}
                          onCheckedChange={(checked) => {
                            setSelectedPriorities(
                              checked
                                ? [...selectedPriorities, priority]
                                : selectedPriorities.filter((p) => p !== priority)
                            );
                          }}
                        >
                          <span className="capitalize">{priority}</span>
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <ShimmerButton className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    AI Analyze All
                  </ShimmerButton>
                </div>
              </CardContent>
            </Card>
          </BlurFade>

          {/* Issues List */}
          <BlurFade delay={0.2} inView>
            <Card>
              <CardHeader>
                <CardTitle>Issues ({filteredIssues.length})</CardTitle>
                <CardDescription>
                  Click on an issue to view details and AI insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredIssues.map((issue, index) => (
                    <Link
                      key={issue.id}
                      href={`/repo/${repoName}/issues/${issue.number}`}
                    >
                      <MagicCard
                        className="cursor-pointer p-4 hover:shadow-lg transition-all"
                        gradientColor="#262626"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold text-base">
                                    {issue.title}
                                  </h3>
                                  <Badge
                                    variant="outline"
                                    className={cn(
                                      "text-xs",
                                      priorityColors[issue.priority]
                                    )}
                                  >
                                    {issue.priority}
                                  </Badge>
                                  {issue.aiInsight && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs bg-purple-500/10 text-purple-500 border-purple-500/20"
                                    >
                                      <Sparkles className="h-3 w-3 mr-1" />
                                      AI
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {issue.description}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                #{issue.number}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                opened {new Date(issue.createdAt).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="h-3 w-3" />
                                {issue.comments}
                              </span>
                              <div className="flex items-center gap-1">
                                <Avatar className="h-5 w-5">
                                  <AvatarImage src={issue.author.avatar} />
                                  <AvatarFallback>
                                    {issue.author.name[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{issue.author.username}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {issue.labels.map((label) => (
                                <Badge key={label} variant="secondary" className="text-xs">
                                  {label}
                                </Badge>
                              ))}
                            </div>

                            {issue.aiInsight && (
                              <div className="p-3 rounded-md bg-muted/50 border border-purple-500/20">
                                <p className="text-xs text-muted-foreground">
                                  <Sparkles className="h-3 w-3 inline mr-1 text-purple-500" />
                                  AI Insight: {issue.aiInsight.summary}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </MagicCard>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        </main>
      </div>
    </>
  );
}
