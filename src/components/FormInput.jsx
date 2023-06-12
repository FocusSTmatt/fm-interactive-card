import React, {useEffect, useState} from 'react'
import '../styles/forminput.css'
import MaskedInput from 'react-text-mask'
import { useForm } from "react-hook-form";
import ThankYou from './ThankYou';

function FormInput({name, setName, setNumber, setMonth, setYear, setCvc, test, month, year, cvc, setclicked}) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues : {
            CardHolderName: '',
        }
    });
    const watchCardHolderName = watch("CardHolderName", true);
    const onSubmit = data => {
        console.log(data.CardHolderName)
        console.log(watchCardHolderName)
    };

    useEffect(() => {
        const displayName = watch((value) => setName(value.CardHolderName));
        return () => displayName.unsubscribe();
    }, [watch])

    function handleName(e){
        setName(e.target.value)
    }
    function handleNumber(e){
        var val = e.target.value;
        setNumber(val.replace(/\W/gi, '').replace(/(.{4})/g, '$1 '));
    }
    function handleMonth(e){
        setMonth(e.target.value)
    }
    function handleYear(e){
        setYear(e.target.value)
    }
    function handleCvc(e){
        setCvc(e.target.value)
    }

    function handleFormSubmit(e){
        e.preventDefault()
        setclicked(true);
        console.log("clicked")
    }

    return (
        <div className='form-ctn'>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <label>CARDHOLDER NAME</label>
                {watchCardHolderName && 
                    <input 
                        onChange={() => setName(event.target.value)} 
                        {...register("CardHolderName", { pattern: /^[A-Za-z]+$/i }, { required: "Please enter your name." })} />}
                {/* <input 
                    className='nameNumberInput'
                    placeholder="e.g. Jane Appleseed" 
                    type="name" 
                    onChange={() => handleName(event)} 
                    onKeyPress={event => (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122)}
                    required
                /> */}
                <label>CARD NUMBER</label>
                <MaskedInput 
                    mask={[ /[\d]/, /\d/, /\d/, /\d/,' ', /\d/, /\d/, /\d/, /\d/,' ',  /\d/, /\d/, /\d/, /\d/,' ',  /\d/, /\d/, /\d/, /\d/]}
                    guide={false}
                    className='nameNumberInput' 
                    placeholder='e.g. 1234 5678 9123 0000'
                    type="text" 
                    onChange={() => handleNumber(event)}
                    required 
                />
                <div className='date-cvc-ctn'>
                    <div className='date-cvc'>
                        <label>EXP. DATE</label>
                        <MaskedInput
                            mask={[/[0-1]/, /[0-9]/,]}
                            guide={false} 
                            className='dateInput'
                            placeholder='MM' 
                            type="text" 
                            onChange={() => handleMonth(event)}
                            required
                        />
                        {month === "00" || year === "00" ? <p className='warning'>Can&apos;t be blank</p> : ""}
                    </div>
                    <div className='date-cvc'>
                        <label>(MM/YY)</label>
                        <MaskedInput 
                            mask={[/[2-3]/, /[0-9]/,]}
                            guide={false} 
                            className='dateInput'
                            placeholder='YY' 
                            type="text" 
                            onChange={() => handleYear(event)}
                            required
                        />
                    </div>
                    <div className='date-cvc'>
                        <label>CVC</label>
                        <MaskedInput
                            mask={[/[0-9]/, /[0-9]/, /[0-9]/]}
                            guide={false} 
                            className='cvcInput'
                            placeholder='e.g. 123' 
                            type="number" 
                            onChange={() => handleCvc(event)} 
                            required
                        />
                        {cvc === "000" ? <p className='warning'>Can&apos;t be blank</p> : ""}
                    </div>
                </div>
                <button type="submit">Confirm</button>
            </form>
        </div>
    )
}

export default FormInput