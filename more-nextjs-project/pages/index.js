// our-domain.com/
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image:
      'https://w.namu.la/s/d023bc0fe2f84bbf21fed6ca6dad5737d5193d7a97e9be1963614265c079ab544a5e22b7474b4d610cd26ab39f24e35f32e3972bb7ecbcdcce0dff68601e32cc193d073c54ebacb0d8c28b9edc44704f3c7513127b0e7b53f4a736eb2d56e8a0',
    address: 'Some address 6, 12345 Some City',
    description: 'This is a first meetup!',
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image:
      'https://w.namu.la/s/d023bc0fe2f84bbf21fed6ca6dad5737d5193d7a97e9be1963614265c079ab544a5e22b7474b4d610cd26ab39f24e35f32e3972bb7ecbcdcce0dff68601e32cc193d073c54ebacb0d8c28b9edc44704f3c7513127b0e7b53f4a736eb2d56e8a0',
    address: 'Some address 4, 67891 Some City',
    description: 'This is a second meetup!',
  },
];

const HomePage = props => {
  return <MeetupList meetups={props.meetups} />;
};

// export const getServerSideProps = async context => {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export const getStaticProps = () => {
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    revalidate: 10,
  };
};

export default HomePage;
