export const FormField = ({
  label,
  type = "text",
  placeholder = "",
  name,
  error,
  onChange,
  required = false,
  value = "",
}) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={name}
      type={type}
      name={name}
      placeholder={placeholder}
      className={`w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-1 -outline-offset-1 ${
        error ? "outline-red-500" : "outline-gray-300"
      } placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 text-sm`}
      onChange={onChange}
      value={value}
      aria-invalid={error ? "true" : "false"}
    />
    {error && (
      <p className="text-sm text-red-500" role="alert">
        {error}
      </p>
    )}
  </div>
);