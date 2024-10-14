import Diamond from "/src/assets/about-us/Content/hexagon-fill.svg"

export default function BoxLinkList({isAddresses = false, isPrices = false, info}) {

    return (
        <>
            <div className="about__links-list">
                <div className="about__links-item">
                    <div className="about__links-item-diamond">
                        <img src={Diamond} alt="hexagon image"/>
                    </div>
                    {isAddresses ? <div className="about__links-item-info">
                        <div className="about__links-item-text">Название: {info.name}</div>
                        <div className="about__links-item-text">Адрес: {info.address}</div>
                        <div className="about__links-item-text">Номер: {info.telephone}</div>
                    </div> : <> </>}
                    {isPrices ? <> </> : <> </>}   {/*TODO*/}

                </div>
            </div>
        </>
    )
}