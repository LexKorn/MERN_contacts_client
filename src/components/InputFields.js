export const InputFields = ({name, setName, phone, setPhone, handler, title, button}) => {
    return (
        <>
            <div className='row'>
                <div className='col s6 offset-s3'>
                    <h1>{title}</h1>
                    <div className="input-field">
                        <input 
                            placeholder="Имя" 
                            id="name" 
                            type="text" 
                            value={name}
                            onChange={e => setName(e.target.value)} />
                        <label htmlFor='link'>Введите имя</label>
                    </div>
                    <div className="input-field">
                        <input 
                            placeholder="Телефон" 
                            id="phone" 
                            type="text" 
                            value={phone}
                            onChange={e => setPhone(e.target.value)} />
                        <label htmlFor='link'>Введите телефон</label>
                    </div>
                    <button className="blue darken-1 btn" onClick={handler}>{button}</button> 
                </div>                           
            </div> 
        </>
    );
}