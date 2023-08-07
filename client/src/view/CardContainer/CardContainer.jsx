import Card from '../Card/Card';
import style  from './CardContainer.module.css';
import Loading from '../Loading/Loading';


function CardContainer ({videogames}){

const Listagames = videogames;

 
return(  
<div className={style.container}>
  
{Listagames.length > 0
 ? 
 Listagames.map((game) => <Card game={game} />)
:
 <Loading />}

  
</div>
);
}

export default CardContainer;