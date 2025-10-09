import { formatDistanceToNow, format } from 'date-fns';

export function formatRelativeTime(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatDate(date: Date): string {
  return format(date, 'MMM d, yyyy');
}

export function formatDateTime(date: Date): string {
  return format(date, 'MMM d, yyyy h:mm a');
}

export function getPriorityColor(priority?: string): string {
  switch (priority) {
    case 'critical':
      return 'bg-red-500/10 text-red-500 border-red-500/20';
    case 'high':
      return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
    case 'medium':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    case 'low':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'completed':
      return 'bg-green-500/10 text-green-500 border-green-500/20';
    case 'in_progress':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    case 'failed':
      return 'bg-red-500/10 text-red-500 border-red-500/20';
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  }
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}
