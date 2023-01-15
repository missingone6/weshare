import { useEffect, useState} from 'react';
import { getLinksAction } from '../../../../api/content';
import LinkWrapper from './style';

const Link = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const result = await getLinksAction()
    setData(result.data);
  }


  useEffect(() => {
    fetchData();
  }, [])

  return (
    <LinkWrapper>
      <div className="link-header">友情链接</div>
      <div className="link-content">
        {
          data.map(item =>
            <a key={item.link} href={item.link} className='link-href'>
              {item.title}
            </a>
          )
        }

      </div>
    </LinkWrapper>
  );
}
export default Link;

