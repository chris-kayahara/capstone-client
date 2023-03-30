import Header from "../../components/Header/Header"
import ListToolBar from "../../components/ListToolBar/ListToolBar"

export default function UserHomePage() {
    return (
        <div>
            <Header/>
            <div className="user-home-page__container">
                <div className="user-home-page__content">
                    <ListToolBar/>
                </div>
            </div>
        </div>
    )
}