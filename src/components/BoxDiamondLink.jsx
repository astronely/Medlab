import "./styles/boxComponents.scss"
import "./styles/boxComponentsMedia.scss"
import Diamond from "/src/assets/about-us/Content/hexagon-fill.svg"
import {useAnimateOnMount} from "./../hooks/useAnimateOnMount.js";

export default function BoxDiamondLink({isAddresses = false, isPrices = false, info}) {
    const isActive = useAnimateOnMount(); // Используем хук
    return (
        <div className={`link__wrap ${isActive ? 'active' : ''}`}>
            <div className="link__list">
                {info.map((item, index) => (
                    <div className="link__item" key={index}>
                        <div className="link__diamond">
                            <img src={Diamond} alt="hexagon image"/>
                        </div>
                        {
                            isAddresses ?
                                <div className="link__item-info">
                                    <div className="link__item-text">Название: {item.name}</div>
                                    <div className="link__item-text">Адрес: {item.address}</div>
                                    <div className="link__item-text">Номер: {item.telephone}</div>
                                </div>
                                : <> </>
                        }
                        {
                            isPrices ?
                                <a className="link__item-text" href={item.link}>{item.name}</a>
                                : <> </>
                        }
                    </div>

                ))}
            </div>
        </div>
    )
}