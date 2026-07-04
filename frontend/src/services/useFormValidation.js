import { useState } from "react";

export function useFormValidation() {
    const [values, setValues] = useState({ nome: "", senha: "" });
    const [errors, setErrors] = useState({ nome: [], senha: [] });

    function validarCampo(name, value) {
        let listaErros = [];

        if (name === "nome") {
            if (!value.startsWith("@")) listaErros.push("Comece com @");
            if (value.length < 5 || value.length > 17) listaErros.push("De 4 a 16 caracteres");
            if (!/^@[a-z._]*$/.test(value)) listaErros.push("Apenas letras minúsculas, . ou _");
        }

        if (name === "senha") {
            if (value.length < 8 || value.length > 16) listaErros.push("Entre 8 e 16 caracteres");
            if (!/[A-Z]/.test(value)) listaErros.push("Falta letra maiúscula");
            if (!/[a-z]/.test(value)) listaErros.push("Falta letra minúscula");
            if (!/[0-9]/.test(value)) listaErros.push("Falta um número");
            if (!/[!@#$%^&*()]/.test(value)) listaErros.push("Falta um símbolo (@, #, $...)");
        }

        setErrors((prev) => ({ ...prev, [name]: listaErros }));
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        validarCampo(name, value);
    }


    const resetValidation = (novosValores = { nome: "", senha: "" }) => {
        setValues(novosValores);
        setErrors({ nome: [], senha: [] });
    };

    const isValid = 
        errors.nome.length === 0 && 
        errors.senha.length === 0 && 
        values.nome !== "";

    return { values, errors, handleChange, isValid, setValues, resetValidation };
}