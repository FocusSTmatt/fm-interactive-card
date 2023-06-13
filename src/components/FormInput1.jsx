import { useForm } from 'react-hook-form';
import '../styles/forminput1.css'


function FormInput1({ number, name, setName, setNumber, setMonth, setYear, setCvc, test, month, year, cvc, setclicked }) {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = async (data, e) => {
        e.preventDefault();
        console.log("Form Submitted")
        setclicked(true);
    };

    function handleNumber(e) {
        console.log(e)
        let val = e.target.value;
        setNumber(val.replace(/\W/gi, '').replace(/(.{4})/g, '$1 '));
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

    function setCreditCardMonth(e) {
        var myNumber = e.target.value;
        var formattedNumber = ("0" + myNumber).slice(-2);
        setMonth(formattedNumber);
    }

    return (
        <form className='form-ctn' onSubmit={handleSubmit(onSubmit)}>
            <div className='name-ctn'>
                <label>CARDHOLDER NAME</label>
                <input
                    placeholder='e.g. JANE APPLESEED'
                    type="text"
                    {...register("CardHolderName", {
                        onChange: (e) => setName(e.target.value), 
                        pattern: /^[a-zA-Z]+/, 
                        required: true 
                    })}
                />
                {errors.CardHolderName && <p className='error'>Enter Valid Name</p>}
            </div>
            <div className='number-ctn'>
                <label>CARD NUMBER</label>
                <input
                    type="text"
                    onClick={() => setNumber('')}
                    maxLength="19"
                    minLength="19"
                    value={ccInputValue()}
                    placeholder='e.g. 1234 4356 0000 2345'
                    {...register("CardHolderNumber", { 
                        pattern: { value: /[0-9]+/, 
                        message: "Not Valid" }, 
                        onChange: (e) => { handleNumber(e) }, 
                        required: true 
                    })}
                />
                {errors.CardHolderNumber && <p className='error'>Enter Valid Number</p>}
            </div>
            <div className='date-cvc-ctn'>
                <div className='date'>
                    <label>EXP. DATE</label>
                    <input
                        // onKeyDown={() => setMonth("")}
                        placeholder='MM'
                        type="text"
                        minLength="2"
                        maxLength="3"
                        value={monthInputValue()}
                        {...register("Month", {
                            max: 12, valueAsNumber: true, 
                            onChange: (e) => setCreditCardMonth(e), 
                            required: true 
                        })}
                    />
                    {errors.Month && <p className='error'>Invalid Month</p>}
                </div>
                <div className='date'>
                    <label>(MM/YY)</label>
                    <input
                        placeholder='YY'
                        type="text"
                        minLength="2"
                        maxLength="2"
                        {...register("Year", { valueAsNumber: true, onChange: (e) => setYear(e.target.value), min: 23, max: 36, required: true })} />
                    {errors.Year && <p className='error'>Invalid Year</p>}
                </div>
                <div className='CVC'>
                    <label>CVC</label>
                    <input
                        minLength="3"
                        maxLength="3"
                        placeholder='CVC'
                        type="text"
                        {...register("Cvc", {
                            pattern: { value: /[0-9]+/ }, 
                            onChange: (e) => setCvc(e.target.value), 
                            required: true 
                        })}
                    />
                    {errors.Cvc && <p className='error'>Invalid CVC</p>}
                </div>
            </div>
            <input className='submit' type="submit" />
        </form>
    )
}

export default FormInput1