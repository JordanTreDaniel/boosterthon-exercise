export const getRandomElement = (arr) => {
  const randomIdx = Math.floor(Math.random() * arr.length);
  return arr[randomIdx];
};

export const loremIpsum = `In vitae suscipit nulla, eget ultrices tellus. Nam viverra metus ac tellus ullamcorper, at feugiat nisl ullamcorper. Maecenas aliquam nec massa eget semper. Pellentesque vitae ipsum dapibus, porttitor orci ac, ultrices turpis. Maecenas molestie tortor massa, vel lacinia purus rutrum et. Duis sagittis tempor lorem vitae sollicitudin. Aliquam a laoreet augue. Aliquam pellentesque, diam nec facilisis dignissim, augue diam blandit sapien, id convallis ante magna eget lorem. Vivamus et commodo ipsum. Proin erat enim, consequat quis nulla sit amet, pharetra porttitor tortor. In dignissim nibh ac quam ultrices dictum. Morbi ut justo varius risus rutrum auctor.

Nam rhoncus nibh aliquam porta dictum. Morbi a dictum lorem. Maecenas fermentum ex est, vitae imperdiet felis pretium mollis. Quisque lacus justo, mattis sed eros non, elementum ullamcorper orci. Proin pulvinar commodo nulla, vitae malesuada lorem varius et. Fusce dapibus sollicitudin risus, eu ullamcorper ligula laoreet sed. Suspendisse rutrum est nec purus porta semper. Duis lobortis, arcu pellentesque pharetra sagittis, arcu felis posuere augue, eu sodales lectus ante sit amet nibh. Curabitur blandit, libero ac ullamcorper dignissim, turpis orci hendrerit augue, ut vulputate risus velit id lacus.

Etiam ornare sagittis odio sagittis facilisis. Cras sit amet tempor magna. Donec lacinia nulla vitae metus dictum, sit amet laoreet purus fringilla. Fusce suscipit urna nibh, vitae gravida sem elementum sit amet. Etiam ullamcorper suscipit erat sit amet interdum. Nam sodales turpis sit amet placerat cursus. Donec sed arcu eget enim faucibus sagittis. In volutpat, nulla vitae dictum imperdiet, lorem neque facilisis nisl, ac suscipit diam elit et purus. Etiam ut massa varius, commodo est nec, aliquam ex. Quisque metus nisi, ultrices id congue non, commodo sit amet nibh.

Praesent elementum ullamcorper fermentum. Pellentesque sed interdum odio, in laoreet nisi. Nunc ac ullamcorper ex, eu tristique dolor. Etiam vel egestas ex. Quisque sodales ipsum non commodo vulputate. Sed accumsan suscipit tellus, vitae pellentesque dui tincidunt a. Donec sit amet augue velit. Aliquam interdum diam eu leo pulvinar tristique. Quisque rhoncus velit non enim sagittis varius. Donec justo mi, sodales eu.`;

export const imageAddresses = [
  `https://images.pexels.com/photos/7363695/pexels-photo-7363695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
  `https://images.pexels.com/photos/7363696/pexels-photo-7363696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
  `https://images.pexels.com/photos/6994963/pexels-photo-6994963.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500`,
  `https://images.pexels.com/photos/5029919/pexels-photo-5029919.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500`,
  `https://images.pexels.com/photos/6646816/pexels-photo-6646816.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500`,
  `https://images.pexels.com/photos/1477430/pexels-photo-1477430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
  `https://images.pexels.com/photos/269176/pexels-photo-269176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
];

export const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
