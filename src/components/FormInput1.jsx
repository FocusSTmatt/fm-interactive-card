import { useForm } from 'react-hook-form';
import '../styles/forminput1.css'
import { useState, useRef } from 'react';


function FormInput1({ number, setName, setNumber, setMonth, setYear, setCvc, month, setclicked }) {
    const placeHolderNameRef = useRef(null)
    const placeHolderNumberRef = useRef(null)
    const placeHolderMonthRef = useRef(null)
    const placeHolderYearRef = useRef(null)
    const placeHolderCvcRef = useRef(null)
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [placeholder, setPlaceholder] = useState([null, null, null])

    function testClick(){

    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted")
        setclicked(true);
    };
    
    function handleName(e){
        setName(e.target.value);
        placeHolderNameRef.current.style.display = "none";
    //     if(errors.CardHolderName){
    //         e.target.style.outlineColor = "red"
    //     } else {
    //         e.target.style.outlineColor = "Purple"
    //     }
    }

    function handleNumber(e) {
        console.log(e);
        let val = e.target.value;
        setNumber(val.replace(/\W/gi, '').replace(/(.{4})/g, '$1 '));
        placeHolderNumberRef.current.style.display = "none";
        console.log(e.target);
    }

    function handleMonth(e) {
        var myNumber = e.target.value;
        var formattedNumber = ("0" + myNumber).slice(-2);
        setMonth(formattedNumber);
        placeHolderMonthRef.current.style.display = "none";
    }

    function handleYear(e) {
        setYear(e.target.value)
        placeHolderYearRef.current.style.display = "none";
    }

    function handleCvc(e) {
        setCvc(e.target.value)
        placeHolderCvcRef.current.style.display = "none";
    }

    function ccInputValue() {
        if (number === "0000 0000 0000 0000") {
            return ""
        } else {
            return number;
        }
    }

    function monthInputValue() {
        if (month === "00") {
            return ""
        } else {
            return month;
        }
    }


    return (
        <form className='form-ctn' onSubmit={handleSubmit(onSubmit)}>
            <div className='name-ctn'>
                <label htmlFor='name'>CARDHOLDER NAME</label>
                <label ref={placeHolderNameRef} className='placeHolderName'>e.g. Jane Appleseed</label>
                <input
                    id="name"
                    type="text"
                    {...register("CardHolderName", {
                        onChange: (e) => handleName(e), 
                        pattern: /^[a-zA-Z]+/, 
                        required: true 
                    })}
                />
                {errors.CardHolderName && <p className='error'>Enter Valid Name</p>}
            </div>
            <div className='number-ctn'>
                <label htmlFor='number'>CARD NUMBER</label>
                <label 
                    ref={placeHolderNumberRef} 
                    className='placeHolderNumber'
                    >e.g. 1234 5678 9123 0000
                </label>
                <input
                    id="number"
                    type="text"
                    onClick={() => setNumber('')}
                    maxLength="19"
                    minLength="19"
                    value={ccInputValue()}
                    {...register("CardHolderNumber", { 
                        pattern: { value: /[0-9]+/, 
                        message: "Not Valid" }, 
                        onChange: (e) => { handleNumber(e) }, 
                        required: true 
                    })}
                />
                {errors.CardHolderNumber && <p className='error'>Enter Valid CC Number</p>}
            </div>
            <div className='date-cvc-ctn'>
                <div className='date'>
                    <label htmlFor='month'>EXP. DATE</label>
                    <label 
                        ref={placeHolderMonthRef} 
                        className='placeHolderMonth'
                        >MM
                    </label>
                    <input
                        id="month"
                        type="text"
                        minLength="2"
                        maxLength="3"
                        value={monthInputValue()}
                        {...register("Month", {
                            max: 12, valueAsNumber: true, 
                            onChange: (e) => handleMonth(e), 
                            required: true, 
                        })}
                    />
                    {errors.Month && <p className='error'>Invalid Month</p>}
                </div>
                <div className='date'>
                    <label htmlFor="year">(MM/YY)</label>
                    <label 
                        ref={placeHolderYearRef} 
                        className='placeHolderYear'
                        >YY
                    </label>
                    <input
                        id="year"
                        type="text"
                        minLength="2"
                        maxLength="2"
                        {...register("Year", {
                                valueAsNumber: true, 
                                onChange: (e) => handleYear(e), 
                                min: 23, 
                                max: 36, 
                                required: true, 
                            })}
                        />
                    {errors.Year && <p className='error'>Invalid Year</p>}
                </div>
                <div className='CVC'>
                    <label htmlFor="cvc">CVC</label>
                    <label 
                        ref={placeHolderCvcRef} 
                        className='placeHolderCvc'
                        >e.g. 123
                    </label>
                    <input
                        id="cvc"
                        minLength="3"
                        maxLength="3"
                        type="text"
                        {...register("Cvc", {
                            pattern: { value: /[0-9]+/ }, 
                            onChange: (e) => handleCvc(e), 
                            required: true 
                        })}
                    />
                    {errors.Cvc && <p className='error'>Invalid CVC</p>}
                </div>
            </div>
            <button className='submit' type="submit">Confirm</button>
        </form>
    )
}

export default FormInput1