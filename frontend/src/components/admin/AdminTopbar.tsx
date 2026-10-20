import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminTopbarProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

const AdminTopbar = ({ title, actionLabel, onAction }: AdminTopbarProps) => {
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="admin-topbar">
      <h1 className="text-lg font-display font-bold text-gold">{title}</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground capitalize">{today}</span>
        {actionLabel && (
          <Button className="bg-gold" size="sm" onClick={onAction}>
            <Plus className="w-4 h-4 mr-1" />
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AdminTopbar;
