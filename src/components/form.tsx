import type {
    InputHTMLAttributes,
    ReactNode,
    TextareaHTMLAttributes,
} from "react";

export interface SelectOption<T extends string = string> {
    value: T;
    label: string;
}

export interface RadioCardOption<T extends string = string> {
    value: T;
    label: string;
    icon?: ReactNode;
    activeClassName?: string;
}

interface BaseFieldProps {
    label: string;
    required?: boolean;
    error?: string;
    hint?: string;
    containerClassName?: string;
}

export function FormTextInput({
    label,
    required,
    error,
    hint,
    containerClassName = "",
    leadingIcon,
    rightLabel,
    startAddon,
    inputWrapperClassName,
    className = "",
    counter,
    ...props
}: BaseFieldProps &
    InputHTMLAttributes<HTMLInputElement> & {
        leadingIcon?: ReactNode;
        rightLabel?: ReactNode;
        startAddon?: ReactNode;
        inputWrapperClassName?: string;
        counter?: { current: number; max: number };
    }) {
    return (
        <div className={containerClassName}>
            <div className="mb-2 flex items-center justify-between gap-2">
                <label className="text-xs font-semibold text-foreground">
                    {label}{required ? " *" : ""}
                </label>
                {rightLabel ? <span className="text-[10px] text-muted-foreground">{rightLabel}</span> : counter ? <span className="text-[10px] text-muted-foreground">{counter.current}/{counter.max}</span> : null}
            </div>
            <div className={`flex items-center rounded-lg border border-border bg-white ${inputWrapperClassName ?? ""}`}>
                {leadingIcon ? <span className="pl-3">{leadingIcon}</span> : null}
                {startAddon ? <span className="pl-3">{startAddon}</span> : null}
                <input
                    className={`min-w-0 flex-1 bg-transparent px-3 py-2 outline-none ${className}`}
                    {...props}
                />
            </div>
            {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : hint ? <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p> : null}
        </div>
    );
}

export function FormTextareaInput({
    label,
    required,
    error,
    hint,
    containerClassName = "",
    counter,
    className = "",
    ...props
}: BaseFieldProps &
    TextareaHTMLAttributes<HTMLTextAreaElement> & {
        counter?: { current: number; max: number };
    }) {
    return (
        <div className={containerClassName}>
            <div className="mb-2 flex items-center justify-between gap-2">
                <label className="text-xs font-semibold text-foreground">
                    {label}{required ? " *" : ""}
                </label>
                {counter ? <span className="text-[10px] text-muted-foreground">{counter.current}/{counter.max}</span> : null}
            </div>
            <textarea
                className={`w-full resize-y rounded-lg border border-border bg-white px-3 py-2 outline-none ${className}`}
                {...props}
            />
            {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : hint ? <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p> : null}
        </div>
    );
}

export function FormSelectInput<T extends string>({
    label,
    options,
    value,
    onChange,
    error,
    inline,
}: BaseFieldProps & {
        options: readonly SelectOption<T>[];
        value: T;
        onChange: (value: T) => void;
        inline?: boolean;
    }) {
    return (
        <div className={inline ? "flex items-center gap-2" : ""}>
            <label className="text-xs font-semibold text-foreground">{label}</label>
            <select
                value={value}
                onChange={(event) => onChange(event.target.value as T)}
                className="rounded-lg border border-border bg-white px-2 py-1.5 text-xs outline-none"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
        </div>
    );
}

export function FormRadioCardGroup<T extends string>({
    label,
    options,
    value,
    onChange,
    containerClassName = "",
}: {
    label: string;
    options: readonly RadioCardOption<T>[];
    value: T;
    onChange: (value: T) => void;
    containerClassName?: string;
}) {
    return (
        <fieldset className={containerClassName}>
            <legend className="mb-2 text-xs font-semibold text-foreground">{label}</legend>
            <div className="grid grid-cols-2 gap-2">
                {options.map((option) => {
                    const active = value === option.value;
                    return (
                        <button
                            type="button"
                            key={option.value}
                            onClick={() => onChange(option.value)}
                            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs ${active ? (option.activeClassName ?? "border-primary bg-primary/10 text-primary") : "border-border bg-white text-foreground"}`}
                        >
                            {option.icon}
                            {option.label}
                        </button>
                    );
                })}
            </div>
        </fieldset>
    );
}

export function FormImageUploadInput({
    label,
    required,
    isUploading,
    previewUrl,
    fileName,
    fileSizeBytes,
    dimensions,
    error,
    onSelectFile,
    onRemoveFile,
    containerClassName = "",
}: BaseFieldProps & {
    isUploading: boolean;
    previewUrl: string | null;
    fileName: string;
    fileSizeBytes: number;
    dimensions: string;
    onSelectFile: (file: File) => void;
    onRemoveFile: () => void;
}) {
    return (
        <div className={containerClassName}>
            <div className="mb-2 text-xs font-semibold text-foreground">{label}{required ? " *" : ""}</div>
            {previewUrl ? (
                <div className="overflow-hidden rounded-lg border border-border">
                    <img src={previewUrl} alt="Cover preview" className="h-48 w-full object-cover" />
                    <div className="flex items-center justify-between gap-3 px-3 py-2 text-[11px] text-muted-foreground">
                        <span>{fileName} · {dimensions} · {Math.max(0, fileSizeBytes / (1024 * 1024)).toFixed(1)} MB</span>
                        <button type="button" onClick={onRemoveFile} className="text-destructive">Remove</button>
                    </div>
                </div>
            ) : (
                <label className="flex cursor-pointer flex-col items-center rounded-lg border border-dashed border-border px-4 py-8 text-center text-xs text-muted-foreground">
                    <span>{isUploading ? "Uploading..." : "Choose a WebP, JPG, or PNG image"}</span>
                    <input
                        type="file"
                        accept="image/webp,image/jpeg,image/png"
                        className="sr-only"
                        disabled={isUploading}
                        onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file) onSelectFile(file);
                        }}
                    />
                </label>
            )}
            {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
        </div>
    );
}

export function FormRichTextInput({
    label,
    required,
    error,
    value,
    onChange,
    isZenMode,
    onToggleZenMode,
    containerClassName = "",
}: BaseFieldProps & {
    value: string;
    onChange: (value: string) => void;
    isZenMode: boolean;
    onToggleZenMode: () => void;
}) {
    return (
        <div className={containerClassName}>
            <div className="mb-2 flex items-center justify-between">
                <div className="text-xs font-semibold text-foreground">{label}{required ? " *" : ""}</div>
                <button type="button" onClick={onToggleZenMode} className="text-[11px] text-muted-foreground">
                    {isZenMode ? "Exit zen mode" : "Zen mode"}
                </button>
            </div>
            <textarea
                value={value}
                onChange={(event) => onChange(event.target.value)}
                rows={isZenMode ? 18 : 12}
                className="w-full rounded-lg border border-border bg-white px-3 py-3 text-sm outline-none"
                placeholder="Write the article body..."
            />
            {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
        </div>
    );
}
