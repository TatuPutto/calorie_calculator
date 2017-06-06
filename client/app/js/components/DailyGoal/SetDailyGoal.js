import React from 'react';

export default function SetDailyGoal() {
    return (
        <div className='modal fade' id='set-daily-goal' role='dialog'>
            <div className='modal-dialog'>
                <form action='/daily-goal' method='POST' encType='application/x-www-form-urlencoded'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <button className='close' data-dismiss='modal'>&times;</button>
                            <h4 className='modal-title'>Aseta päivätavoite</h4>
                        </div>
                        <div className='modal-body'>
                            <label>Energia</label><br />
                            <input type='text' className='amount' name='energy' style={{marginLeft: '22px'}} required />
                            <span className='percent-sign'>kcal</span><br />

                            <label>Proteiini</label><br />
                            <input type='text' className='amount' name='protein' required />
                            {/*<input type='text' className='percentual-amount' />*/}
                            <span className='percent-sign'>g</span><br />

                            <label>Hiilihydraatit</label><br />
                            <input type='text' className='amount' name='carbs' required />
                            {/*<input type='text' className='percentual-amount' />*/}
                            <span className='percent-sign'>g</span><br />

                            <label>Rasva</label><br />
                            <input type='text' className='amount' name='fat' required />
                            {/*<input type='text' className='percentual-amount' />*/}
                            <span className='percent-sign'>g</span><br />
                        </div>
                        <div className='modal-footer'>
                            <button type='submit' className='btn btn-primary'>
                                Aseta
                            </button>
                            <button type='button' className='btn btn-default' data-dismiss='modal'>
                                Sulje
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
}
