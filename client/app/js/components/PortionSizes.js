import React from 'react';

export default function PortionSizes(props) {
    return (
        <table className='portion-sizes'>
            <thead>
                <tr>
                    <th>Annoskoot</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>5 g</td>
                    <td>Teelusikka</td>
                </tr>
                <tr>
                    <td>15 g</td>
                    <td>Ruokalusikka</td>
                </tr>
                <tr>
                    <td>100 g</td>
                    <td>Pieni annos</td>
                </tr>
            </tbody>
        </table>
    );
}
