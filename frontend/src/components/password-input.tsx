import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

interface PasswordInputProps {
    id: string;
    name: string;
    placeholder?: string;
    autoComplete?: string;
    autoFocus?: boolean;
    required?: boolean;
    tabIndex?: number;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    style?: React.CSSProperties;
}

export default function PasswordInput({
    id,
    name,
    placeholder = '********',
    autoComplete = 'current-password',
    autoFocus = false,
    required = false,
    tabIndex,
    value,
    onChange,
    className = '',
    style,
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <Input
                id={id}
                type={showPassword ? 'text' : 'password'}
                name={name}
                required={required}
                tabIndex={tabIndex}
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`pl-11 pr-11 h-12 rounded-xl border-0 text-sm transition-all duration-200 focus:ring-2 ${className}`}
                style={style}
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-forest/50 hover:text-forest transition-colors"
                tabIndex={-1}
                title={showPassword ? 'Masquer' : 'Afficher'}
            >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
        </div>
    );
}
