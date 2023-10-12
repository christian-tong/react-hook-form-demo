import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "Christian Tong",
      correo: "christian.tongcruz96@gmail.com",
      password: "",
    },
  });

  console.log(errors);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    alert("Enviando Datos");
    reset();
  });

  return (
    <main className="h-screen w-full text-slate-100 bg-slate-900 text-xl flex justify-center items-center p-6">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 p-6 border border-slate-300 max-w-3xl w-full">
        <div className="flex flex-col gap-4">
          <label htmlFor="nombre">Nombe :</label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre"
            className="p-2 border shadow-md shadow-slate-400 border-slate-500 text-slate-950 rounded-xl required:border-red-700"
            {...register("nombre", {
              required: {
                value: true,
                message: "El nombre es requerido",
              },
              minLength: {
                value: 2,
                message: "El nombre tiene tener mínimo 2 caracteres",
              },
              maxLength: {
                value: 50,
                message: "El nombre tiene tener máximo 50 caracteres",
              },
            })}
          />
          {errors.nombre && typeof errors.nombre.message === "string" && (
            <span className="text-red-500">{errors.nombre.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="correo">Correo :</label>
          <input
            id="correo"
            type="email"
            placeholder="Correo"
            className="p-2 border shadow-md shadow-slate-400 border-slate-500 text-slate-950 rounded-xl"
            {...register("correo", {
              required: {
                value: true,
                message: "El correo es requerido",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "El correo no es correcto",
              },
            })}
          />
          {errors.correo && typeof errors.correo.message === "string" && (
            <span className="text-red-500">{errors.correo.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="password">Password :</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="p-2 border shadow-md shadow-slate-400 border-slate-500 text-slate-950 rounded-xl"
            {...register("password", {
              required: {
                value: true,
                message: "El Password es requerido",
              },
              minLength: {
                value: 6,
                message: "El password tiene que ser mayor de 6 caracteres",
              },
              maxLength: {
                value: 12,
                message: "El password tiene que ser menor de 12 caracteres",
              },
            })}
          />
          {errors.password && typeof errors.password.message === "string" && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="confirmar_password">Confirmar Password :</label>
          <input
            id="confirmar_password"
            type="password"
            placeholder="Confirmar Password"
            className="p-2 border shadow-md shadow-slate-400 border-slate-500 text-slate-950 rounded-xl"
            {...register("confirmar_password", {
              required: {
                value: true,
                message: "Debe confirmar su password",
              },
              validate: (value) => {
                return value === watch("password") || "El password no coincide";
              },
            })}
          />
          {errors.confirmar_password &&
            typeof errors.confirmar_password.message === "string" && (
              <span className="text-red-500">
                {errors.confirmar_password.message}
              </span>
            )}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="fecha_nacimiento">Fecha Nacimiento :</label>
          <input
            id="fecha_nacimiento"
            type="date"
            className="p-2 border shadow-md shadow-slate-400 border-slate-500 text-slate-950 rounded-xl"
            {...register("fecha_nacimiento", {
              required: {
                value: true,
                message: "La fecha de nacimiento es requerido",
              },
              validate: (value) => {
                const fechaNacimiento = new Date(value);
                const fechaActual = new Date();
                const edad =
                  fechaActual.getFullYear() - fechaNacimiento.getFullYear();

                return edad >= 18 || "Debe ser mayor de edad";
              },
            })}
          />
          {errors.fecha_nacimiento &&
            typeof errors.fecha_nacimiento.message === "string" && (
              <span className="text-red-500">
                {errors.fecha_nacimiento.message}
              </span>
            )}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="pais">País :</label>
          <select
            id="pais"
            className="p-2 border shadow-md shadow-slate-400 border-slate-500 text-slate-950 rounded-xl"
            {...register("pais", { required: true })}>
            <option value="mx">México</option>
            <option value="co">Colombia</option>
            <option value="ar">Argentina</option>
          </select>
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="foto_perfil">Foto de Perfil :</label>
          <input
            id="foto_perfil"
            type="file"
            className="p-2 border shadow-md shadow-slate-400 border-slate-500 text-slate-950 bg-slate-300 rounded-xl"
            {...register("foto_perfil")}
          />
        </div>
        <div className=" flex flex-col gap-6 justify-center items-center">
          <div className="flex gap-6 justify-center items-center">
            <label htmlFor="terminos">Terminos y Condicioes:</label>
            <input
              type="checkbox"
              id="terminos"
              {...register("terminos", {
                required: {
                  value: true,
                  message:
                    "Debe aceptar los términos y condiciones para poder continuar",
                },
              })}
            />
          </div>

          {errors.terminos && typeof errors.terminos.message === "string" && (
            <span className="text-red-500">{errors.terminos.message}</span>
          )}
        </div>
        <button className="p-2 border shadow-md shadow-slate-400 border-slate-500 text-slate-100 rounded-xl hover:-translate-y-1 transition-all  bg-slate-800">
          Enviar
        </button>

        <pre>{JSON.stringify(watch(), null, 2)}</pre>
      </form>
    </main>
  );
}

export default App;
