import React, { useEffect, useState } from "react";
import { FormField } from "../form_field";

export const SubscriptionForm = ({
  props,
  onSubmit,
  isSubmitting,
  errors,
  submitError,
  onChange,
  formValues,
}) => {
  
  const [userEmail, setUserEmail] = useState("");

  useEffect(() =>{
    const storedEmail= localStorage.getItem("userEmail");
    if ( storedEmail){
      setUserEmail(storedEmail)
    }
  },[]);

  console.log('userEmail en ModalSuscribe es decir si esta pasando:', userEmail);

  return (
    <form className="w-full mt-4 gap-2 flex flex-col" onSubmit={onSubmit}>
      <FormField
        label={props.form.name.label}
        type="text"
        placeholder={props.form.name.placeholder}
        name="name"
        error={errors.name}
        onChange={(e) => onChange("name", e.target.value)}
        value={formValues.name}
        required
      />
      
      <FormField
        label={props.form.email.label}
        type="email"
        placeholder={props.form.email.placeholder}
        name="email"
        error={errors.email}
        onChange={(e) => onChange("email", e.target.value)}
        value={userEmail}
        required
      />
      
      <button
        type="submit"
        className="w-full mt-6 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:opacity-70"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : props.form.submit}
      </button>
      
      {submitError && <p className="text-sm text-red-500 mt-2">{submitError}</p>}
      
      <p className="text-sm text-gray-500 mt-4">
        {props.terms.p1}{" "}
        <a href="/terminos-y-condiciones" className="underline text-gray-900">
          {props.terms.p2}
        </a>{" "}
        {props.terms.p3}{" "}
        <a href="/politica-de-privacidad" className="underline text-gray-900">
          {props.terms.p4}
        </a>
        .
      </p>
    </form>
  );
};


// Hola