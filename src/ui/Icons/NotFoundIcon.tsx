import { IconProps } from "@/types/types"
import { FC } from "react"

const NotFoundIcon: FC<IconProps> = (props) => (
  <svg
    width="227"
    height="101"
    viewBox="0 0 227 101"
    xmlns="http://www.w3.org/2000/svg"
    fill="#121212"
    {...props}
  >
    <path d="M23.448 1.274C20.8328 2.11619 19.0598 3.5346 17.8186 5.66223C16.9321 7.21363 6.47129 44.9347 0.930596 66.6542C-0.487822 72.062 -0.31052 74.1453 1.63981 76.8935C3.63446 79.6416 5.76209 80.4395 11.2141 80.4395C13.6964 80.4395 16.0456 80.3065 16.4446 80.1735C17.597 79.7303 18.4392 77.381 17.9516 76.0513C17.1981 74.1896 16.2672 73.835 11.9233 73.7907C5.54046 73.7907 5.58478 75.1648 11.0812 54.509C21.3647 16.0787 23.2707 9.38558 24.2015 8.45474C24.9107 7.74554 25.6199 7.52391 27.4816 7.56823C30.4071 7.65688 33.9532 9.11963 33.9532 10.3164C33.9532 10.7597 31.072 22.506 27.5259 36.3355C23.9799 50.2095 21.0987 61.8228 21.0987 62.133C21.0987 62.4876 21.5863 63.2412 22.2069 63.8174C23.2707 64.9255 23.315 64.9255 32.0915 64.9255C43.5718 64.9255 42.8183 65.5904 42.8183 55.5728C42.8183 51.5835 42.9956 48.0375 43.1729 47.7272C44.0594 46.3531 48.5363 45.9099 51.0185 46.9294L52.5699 47.5942V54.4204C52.5699 61.5125 52.9688 63.7288 54.3429 64.4823C54.7862 64.7482 56.7365 64.9255 58.6868 64.9255C61.6566 64.9255 62.3215 65.0585 62.9864 65.8121C64.1389 67.0532 64.1832 70.9538 63.0751 72.5939C62.3215 73.7463 62.1442 73.7907 58.6425 73.7907C52.8359 73.835 52.5699 74.3226 52.5699 85.0937C52.5699 92.629 52.5256 92.8507 51.5947 93.3826C50.0433 94.2248 45.4335 94.0918 44.0151 93.1609L42.8183 92.4074V84.1629C42.8183 73.1701 43.4388 73.7907 32.9337 73.7907C25.7973 73.7907 25.1324 73.8793 24.0242 74.7215C22.5172 75.9183 22.4285 78.1346 23.8913 79.4643C24.8221 80.3509 25.3983 80.4395 30.5401 80.4395H36.1694V87.177C36.1694 93.3826 36.2581 94.0918 37.1889 95.7318C39.9371 100.563 48.4033 102.336 54.5202 99.3222C58.8198 97.2389 59.662 95.0669 59.662 86.2905V80.4395H61.6566C64.0502 80.4395 65.6016 79.7303 67.4633 77.6913C69.458 75.608 70.3445 73.569 70.6104 70.6879C71.2753 63.7731 67.286 58.321 61.6123 58.2767H59.7506L59.5733 52.1598C59.4404 46.3088 59.3517 45.9099 58.1993 44.1368C55.0078 39.3054 44.7243 38.1529 39.5825 42.0535C36.6127 44.3141 36.1694 45.5996 36.1694 52.3814V58.2767H32.6234C30.6731 58.2767 29.0773 58.0994 29.0773 57.9221C29.0773 57.7005 31.6482 47.3726 34.8397 34.9614C38.43 20.9546 40.602 11.5575 40.602 10.1834C40.602 7.56823 39.6268 5.75088 37.3219 3.97786C33.8645 1.36265 27.2157 0.0328824 23.448 1.274Z" />
    <path d="M179.474 1.27413C176.903 2.11631 175.086 3.53473 173.845 5.66236C173.224 6.7705 170.831 14.6605 168.127 24.811C165.556 34.2967 161.788 48.1706 159.794 55.6173C155.494 71.4415 155.272 73.4362 157.4 76.539C158.198 77.6471 159.572 78.8439 160.724 79.4645C162.63 80.3953 163.029 80.4396 177.435 80.4396H192.196V87.0885C192.196 95.732 192.772 97.106 197.515 99.544C200.307 101.007 206.956 101.051 209.926 99.6769C214.669 97.4606 215.688 95.1114 215.688 85.9803V80.4396H217.727C220.121 80.4396 221.096 79.9964 223.357 77.8687C227.434 73.9238 227.833 66.2554 224.243 61.4239C222.869 59.6066 220.076 58.3212 217.594 58.2768H215.688V53.268C215.688 45.4667 214.624 42.9845 210.458 41.0785C205.759 38.9509 199.155 39.3498 195.609 42.0537C192.639 44.3143 192.196 45.5997 192.196 52.3815V58.2768H188.65C186.699 58.2768 185.104 58.0995 185.104 57.8779C185.104 57.6563 187.719 47.3284 190.866 34.9172C194.412 20.999 196.628 11.469 196.628 10.1392C196.628 7.61269 195.653 5.70669 193.348 3.97799C189.891 1.36278 183.242 0.0330101 179.474 1.27413ZM188.118 8.63217C189.314 9.16408 189.979 9.74031 189.979 10.2722C189.979 10.7155 187.098 22.4174 183.552 36.2913C180.006 50.1652 177.125 61.7786 177.125 62.1332C177.125 62.4878 177.613 63.2413 178.233 63.8175C179.297 64.9257 179.341 64.9257 188.162 64.9257H197.027L197.914 63.7732C198.756 62.6651 198.844 62.0002 198.844 55.44C198.844 51.5393 199.022 48.0376 199.199 47.7273C200.086 46.3532 204.562 45.91 207.045 46.9295L208.596 47.5944V54.4205C208.596 61.5126 208.995 63.7289 210.369 64.4824C210.812 64.7484 212.763 64.9257 214.713 64.9257C217.683 64.9257 218.348 65.0586 219.057 65.8565C220.121 67.0533 220.165 70.9539 219.101 72.594C218.348 73.7465 218.126 73.7908 214.669 73.7908C208.862 73.8351 208.596 74.3227 208.596 85.0938C208.596 92.6292 208.552 92.8508 207.621 93.3827C206.07 94.2249 201.46 94.0919 200.041 93.1611L198.844 92.4075V84.163C198.844 76.0514 198.844 75.9627 197.736 74.8989L196.673 73.7908H180.272C165.955 73.7908 163.783 73.7021 163.207 73.0816C162.808 72.727 162.497 72.2394 162.497 72.1064C162.497 71.7518 171.717 37.2222 176.416 20.0238C177.967 14.2172 179.519 9.16408 179.829 8.76515C181.203 7.1251 184.483 7.08078 188.118 8.63217Z" />
    <path d="M108.952 12.6655C95.3439 13.9509 82.4451 22.949 76.2839 35.4488C73.3584 41.3884 72.4719 45.0231 72.2059 52.1152C71.8513 61.335 73.58 68.1168 78.1899 75.5635C83.5089 84.1183 91.8865 90.4569 102.081 93.604C105.672 94.7121 106.603 94.8008 113.296 94.8008C119.989 94.8008 120.92 94.7121 124.51 93.604C134.705 90.4569 143.083 84.1183 148.402 75.5635C153.011 68.1168 154.74 61.335 154.386 52.1152C154.12 45.0675 152.967 40.3246 149.953 34.6066C146.762 28.4454 144.102 26.4951 141.62 28.534C140.113 29.7308 140.29 31.9028 142.063 34.4737C145.609 39.6598 147.426 45.2005 147.737 52.1152C148.579 68.7373 138.65 82.301 121.939 87.3541C119.945 87.9746 117.817 88.1963 113.296 88.1963C108.775 88.1963 106.647 87.9746 104.652 87.3541C93.4379 83.941 85.3263 76.8932 81.2927 67.053C74.0676 49.1898 82.6224 28.8443 100.441 21.6192C110.725 17.497 123.579 18.8267 132.533 25.0323C135.414 26.9826 136.921 27.1599 138.295 25.7858C140.911 23.1706 139.138 20.5997 132.4 17.098C125.219 13.3747 117.329 11.8676 108.952 12.6655Z" />
    <path d="M96.0975 35.0943C95.1667 35.4489 94.1472 37.8425 94.4575 38.9063C94.6348 39.4382 97.8705 43.0286 101.683 46.8406L108.597 53.844L101.417 61.0691C96.6737 65.8563 94.2358 68.6488 94.2358 69.2693C94.2358 70.8207 96.0975 72.5938 97.7376 72.5938C99.023 72.5938 100.042 71.7516 106.248 65.546L113.296 58.4982L120.344 65.546C126.549 71.7516 127.569 72.5938 128.854 72.5938C130.494 72.5938 132.356 70.8207 132.356 69.2693C132.356 68.6488 129.918 65.8563 125.175 61.0691L117.994 53.844L124.909 46.8406C128.721 43.0286 131.957 39.4382 132.134 38.9063C132.444 37.8425 131.735 36.2024 130.627 35.3603C128.854 33.9862 127.968 34.6067 120.521 41.9648L113.296 49.1455L106.071 41.9648C98.8457 34.784 98.0922 34.2964 96.0975 35.0943Z" />
  </svg>
)

export default NotFoundIcon
