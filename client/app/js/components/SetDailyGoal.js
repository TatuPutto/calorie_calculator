import React from 'react';

export default function SetDailyGoal() {
    return (
        <div className='modal fade' id='myModal' role='dialog'>
            <div className='modal-dialog'>
                <form action='/daily-goal' method='POST' encType='application/x-www-form-urlencoded'>

                    <div className='modal-content'>
                        <div className='modal-header'>
                            <button className='close' data-dismiss='modal'>&times;</button>
                            <h4 className='modal-title'>Aseta päivätavoite</h4>
                        </div>
                        <div className='modal-body'>
                            <label>Energia</label>
                            <input type='text' name='energy' /><br />
                            <label>Proteiini</label>
                            <input type='text' name='protein' /><br />
                            <label>Hiilihydraatit</label>
                            <input type='text' name='carbs' /><br />
                            <label>Rasva</label>
                            <input type='text' name='fat' />
                        </div>
                        <div className='modal-footer'>
                            <button type='submit' className='btn btn-primary'>Aseta</button>
                            <button type='button' className='btn btn-default' data-dismiss='modal'>Sulje</button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
}
