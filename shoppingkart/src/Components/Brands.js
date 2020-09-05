import React from 'react';
import '../CSS/Brands.css';

const Brand = () => {

    const brand = ['Balaji', 'Haldiram', 'Chedda', 'Cadbury', 'Britannia', 'Pepsi', 'Garden', 'Bikaner'];

    return (
        <div className="brand-section">
            <p className="heading">Brands Associated</p>
            <div className="brand-area">
                {
                    brand.map((brand,index) => {
                        return <div key={index} className="brand">{brand}</div>
                    })
                }
            </div>
        </div>
    );
};

export default Brand;
