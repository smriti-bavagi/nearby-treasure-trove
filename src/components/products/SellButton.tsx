
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonProps } from '@/components/ui/button';
import { Package } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface SellButtonProps extends ButtonProps {
  showIcon?: boolean;
  showText?: boolean;
  text?: string;
}

const SellButton = ({
  showIcon = true,
  showText = true,
  text = "Sell Now",
  className,
  ...props
}: SellButtonProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      toast.error("You need to login to sell items");
      navigate("/login");
    }
  };

  return (
    <Button
      as={Link}
      to="/create-listing"
      onClick={handleClick}
      className={className}
      size="sm"
      {...props}
    >
      {showIcon && <Package className="h-4 w-4" />}
      {showText && <span>{text}</span>}
    </Button>
  );
};

export default SellButton;
