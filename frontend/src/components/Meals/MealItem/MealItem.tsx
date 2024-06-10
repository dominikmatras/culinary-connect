import toast from 'react-hot-toast'
import { useOrderContext } from '../../../context/OrderContext'
import { Meal } from '../MealsList/MealsList'
import './MealItem.less'
import { useNavigate } from 'react-router-dom'
import { FcInfo } from 'react-icons/fc'

const MealItem = ({ id, name, price, photoPath }: Meal) => {
	const navigate = useNavigate()
	const { dispatch, startOrder } = useOrderContext()

	const addMealToOrderHandler = () => {
		if (!startOrder) {
			toast('You have to choose a table first!', { icon: <FcInfo /> })
			navigate('/tables')
			return
		}
		dispatch({ type: 'ADD_MEAL_TO_ORDER', payload: { id, name, price, quantity: 1 } })
	}

	return (
		<div className="meal-item">
			<img src={photoPath} alt="burger image" className="meal-item__img" />
			<h5 className="meal-item__title">{name}</h5>
			<p className="meal-item__price">
				<span>${price}</span>
			</p>
			<button className="meal-item__btn" onClick={addMealToOrderHandler}>
				Add dish
			</button>
		</div>
	)
}

export default MealItem
