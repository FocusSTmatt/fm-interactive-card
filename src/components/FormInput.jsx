// import '../styles/forminput.css'
import MaskedInput from 'react-text-mask'
import * as yup from "yup"; 
import { useForm } from 'react-hook-form';
import { nameSchema } from '../validations/NameValidations';



function FormInput({name, setName, setNumber, setMonth, setYear, setCvc, test, month, year, cvc, setclicked}) {
    const {register, handleSubmit, watch, formState: { errors }} = useForm();
    const onSubmit = async (data, e) => {
        e.preventDefault();
        let nameData = {name: e.target[0].value};
        const isValid = await nameSchema.isValid(nameData)
        {isValid == true ? setclicked(true) : null} 
        console.log(data)
    };
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let formData = {name: e.target[0].value};
        const isValid = await nameSchema.isValid(formData)
        {isValid == true ? setclicked(true) : null} 
        console.log(isValid)
    }
    function handleName(e){
        setName(e.target.value)
    }
    function handleNumber(e){
        var val = e.target.value;
        setNumber(val.replace(/\W/gi, '').replace(/(.{4})/g, '$1 '));
    }
    function handleMonth(e){
       
    }
    function handleYear(e){
        setYear(e.target.value)
    }
    function handleCvc(e){
        setCvc(e.target.value)
    }

    return (
        <div className='form-ctn'>
            {/* <form className='form' onSubmit={() => handleSubmit(event)}> */}
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <label>CARDHOLDER NAME</label>
                <input 
                    className='nameNumberInput'
                    placeholder="e.g. Jane Appleseed" 
                    type="name" 
                    onChange={() => handleName(event)}
                    required
                />
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
                        <input 
                            className="dateInput" 
                            type="tel" 
                            maxLength={2}
                            max={12}
                            required={true}
                            onChange={() => handleMonth(event)}
                            {...register("Month", {required: true}, { onChange: (e) => console.log(e.target.value) })} 
                        />
                            {errors.Month && <p>Can&apos;t be Blank</p>}
                         {/* <MaskedInput
                            mask={[/[0-1]/, /[0-9]/,]}
                            // mask={[/[1-12]/]}
                            guide={false} 
                            className='dateInput'
                            placeholder='MM' 
                            type="text" 
                            onChange={() => handleMonth(event)}
                            required
                        />
                        {month === "00" || year === "00" ? <p className='warning'>Can&apos;t be blank</p> : ""}  */}
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