import React, { useState } from "react";
import "./Commit.css";
import { Icons } from "../../../../Icons/Icons";
import { generatePaginationButtons } from "../../../../utils/paginationServices";
import { downloadAsExcel } from "../../../../utils/excelDownload";

const data = [
    {
        title: "Visit", achieved: 0, committed: 25, Icons: <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.436 8.92735C18.436 8.9514 18.436 8.97546 18.436 8.99952C18.4067 9.0717 18.4067 9.1434 18.436 9.21557C18.436 9.28775 18.436 9.35944 18.436 9.43162C18.4067 9.5038 18.4067 9.5755 18.436 9.64767C18.436 9.71985 18.436 9.79155 18.436 9.86372C18.4091 9.89981 18.4091 9.9359 18.436 9.97151C18.436 10.0437 18.436 10.1154 18.436 10.1876C18.3667 10.2203 18.4024 10.2828 18.4014 10.3295C18.3749 11.8592 18.3514 13.3888 18.3268 14.9185C18.323 15.1505 18.2166 15.2582 17.9866 15.2626C16.5652 15.289 15.1438 15.316 13.7219 15.341C13.6512 15.3424 13.5732 15.3448 13.5102 15.3189C13.3808 15.2659 13.3124 15.1548 13.337 15.0167C13.3649 14.8579 13.4707 14.7665 13.6382 14.7626C14.1001 14.7516 14.5616 14.741 15.0235 14.7328C15.8815 14.7174 16.7389 14.7005 17.5969 14.6924C17.72 14.6909 17.7537 14.6645 17.7556 14.5365C17.786 12.401 17.8235 10.265 17.8567 8.12955C17.8591 7.96835 17.8591 7.81582 18.0381 7.73739C18.2195 7.65799 18.3244 7.77781 18.436 7.8827C18.436 7.97894 18.436 8.07469 18.436 8.17093C18.3971 8.26572 18.4269 8.36485 18.4173 8.46156C18.4173 8.54048 18.4173 8.61939 18.4173 8.6983" fill="#007BFF" />
            <path d="M0.0534146 11.4367C0.0534146 10.291 0.00240951 9.1843 3.60615e-06 8.03861C-0.000477574 7.90436 0.0471593 7.80572 0.164567 7.74461C0.271389 7.68927 0.373881 7.70756 0.46723 7.77877C0.555767 7.84662 0.577901 7.93997 0.579345 8.04823C0.600517 9.36811 0.625057 10.6875 0.647191 12.0069C0.661145 12.8528 0.6751 13.6983 0.681836 14.5442C0.682799 14.6621 0.714556 14.6895 0.83004 14.6914C2.13741 14.7111 3.44477 14.7376 4.75262 14.7621C5.02449 14.7674 5.17702 14.9657 5.07405 15.1803C5.01486 15.304 4.91045 15.3463 4.78005 15.3444C4.51011 15.34 4.24016 15.3391 3.97022 15.3338C2.7947 15.3107 1.61918 15.2871 0.444133 15.2631C0.217497 15.2582 0.114043 15.149 0.110194 14.9128C0.0914279 13.7671 0.0721807 12.6214 0.0534146 11.4757C0.0534146 11.4665 0.0538958 11.4473 0.0534146 11.4367Z" fill="#007BFF" />
            <path fillRule="evenodd" clipRule="evenodd" d="M14.2994 11.492C14.282 11.5074 14.2682 11.5187 14.2572 11.5277L14.2571 11.5278C14.2392 11.5424 14.2284 11.5513 14.221 11.5623C13.9905 11.9025 13.6657 11.966 13.2711 11.9588C12.4938 11.9441 11.716 11.9458 10.9384 11.9475C10.516 11.9485 10.0937 11.9494 9.67142 11.9477C9.54198 11.9472 9.50252 11.9713 9.503 12.1108C9.50878 13.8209 9.5083 15.531 9.50397 17.2412C9.50348 17.3769 9.53043 17.4235 9.67767 17.4211C10.0414 17.4147 10.4054 17.4156 10.7694 17.4164H10.7694H10.77C10.9518 17.4168 11.1337 17.4173 11.3156 17.4168C11.4426 17.4163 11.5543 17.4423 11.624 17.5602C11.7246 17.731 11.6245 17.9523 11.4263 17.9942C11.402 17.9995 11.3763 17.9993 11.3509 17.9991L11.3368 17.999L10.4905 17.999C9.36261 17.9989 8.23451 17.9988 7.10672 18C6.96766 18 6.86325 17.9519 6.80118 17.8234C6.74728 17.7127 6.77231 17.6131 6.84256 17.5212C6.91666 17.4245 7.02444 17.4168 7.13463 17.4168C7.29851 17.4169 7.46238 17.4167 7.62624 17.4164H7.62626C8.00849 17.4159 8.39065 17.4153 8.77257 17.4197C8.89431 17.4211 8.93473 17.3961 8.93425 17.2647C8.92944 15.5426 8.92944 13.8204 8.93473 12.0988C8.93521 11.9645 8.88998 11.9477 8.77257 11.9482C8.26748 11.9499 7.76232 11.9498 7.25714 11.9497C6.4783 11.9496 5.69942 11.9495 4.92072 11.9559C4.69024 11.9578 4.51364 11.902 4.37314 11.7206C4.33446 11.6707 4.29006 11.6251 4.23399 11.5675L4.23399 11.5675L4.23398 11.5675C4.20564 11.5384 4.17434 11.5062 4.13929 11.4689L4.13912 11.7472C4.13893 11.9601 4.13875 12.1551 4.13977 12.3504C4.14015 12.4317 4.19225 12.4259 4.23851 12.4207C4.25061 12.4193 4.2623 12.418 4.27257 12.4183C4.79417 12.4332 5.31625 12.4467 5.83785 12.4553C6.17179 12.4611 6.42778 12.6002 6.59234 12.8894C7.21692 13.9855 7.84101 15.0816 8.45884 16.1816C8.66816 16.5545 8.44152 16.9178 8.00942 16.9197C7.90436 16.9202 7.7992 16.919 7.69402 16.9178H7.69401C7.48701 16.9154 7.27995 16.9131 7.07352 16.9236C6.79155 16.9375 6.61688 16.8182 6.48215 16.5776C6.28603 16.2274 6.08512 15.8799 5.88423 15.5325C5.70808 15.2278 5.53195 14.9232 5.35908 14.6168C5.29364 14.5008 5.22242 14.4657 5.09299 14.4672C4.52591 14.4735 3.9592 14.4721 3.39222 14.4706H3.39217L3.14902 14.47C2.00814 14.4681 1.15789 13.6265 1.15452 12.4909C1.15116 11.327 1.15212 10.163 1.15452 8.99902C1.15645 8.15166 1.78728 7.54634 2.6303 7.51362C3.04268 7.49774 3.33042 7.61467 3.60951 7.92599C4.04823 8.4152 4.50563 8.88744 4.96311 9.35976L4.96311 9.35976C5.19452 9.59868 5.42596 9.83762 5.655 10.0788C5.73247 10.1606 5.80802 10.1928 5.91965 10.1904C6.23262 10.1846 6.54559 10.186 6.85856 10.1874H6.85859L6.99942 10.188C7.48397 10.1899 7.83427 10.5369 7.8463 11.0238C7.8506 11.1958 7.85277 11.2823 7.89711 11.3258C7.94198 11.3698 8.03003 11.3698 8.20718 11.3698C8.397 11.3698 8.58681 11.3695 8.77661 11.3692C9.32491 11.3684 9.87313 11.3676 10.4211 11.3736C10.5669 11.3751 10.6063 11.3323 10.5953 11.1942C10.5857 11.0758 10.5881 10.956 10.6165 10.8367C10.7079 10.4503 11.0187 10.1914 11.4128 10.188C11.7848 10.1851 12.1567 10.1837 12.5287 10.1895C12.6331 10.1909 12.7053 10.1611 12.7779 10.0846C13.143 9.70091 13.5092 9.31834 13.8755 8.93578L13.8758 8.93547C14.277 8.51638 14.6783 8.09728 15.078 7.67674C15.1857 7.56318 15.2993 7.50784 15.4571 7.51939C15.545 7.52596 15.633 7.52526 15.7212 7.52456C15.8721 7.52337 16.0233 7.52217 16.1736 7.55741C16.804 7.70657 17.2808 8.28639 17.2832 8.93503C17.2875 10.1529 17.2899 11.3712 17.2822 12.5891C17.276 13.589 16.4099 14.4532 15.4061 14.4662C14.7103 14.4753 14.0141 14.471 13.3183 14.4662C13.2095 14.4652 13.1499 14.496 13.0945 14.5937C12.9091 14.9205 12.721 15.2458 12.5329 15.5712L12.5327 15.5715C12.3349 15.9138 12.137 16.2561 11.9421 16.6002C11.817 16.8211 11.6505 16.9308 11.3912 16.9207C11.1886 16.913 10.9859 16.9146 10.7832 16.9162H10.783C10.6558 16.9172 10.5286 16.9181 10.4014 16.9168C10.0063 16.913 9.77776 16.5454 9.97071 16.2018C10.5958 15.086 11.2271 13.9735 11.8627 12.8629C12.0205 12.5872 12.2756 12.4587 12.5946 12.4529C12.8103 12.4488 13.0262 12.4436 13.242 12.4384L13.2421 12.4384C13.5481 12.4311 13.8541 12.4238 14.1599 12.4193C14.2619 12.4178 14.3095 12.4029 14.3042 12.2831C14.2956 12.1045 14.2969 11.9245 14.2983 11.729V11.729V11.729C14.2988 11.6526 14.2994 11.5739 14.2994 11.492ZM7.8559 16.3375C7.77237 16.3381 7.68682 16.3456 7.60191 16.3531C7.40899 16.37 7.21939 16.3866 7.06436 16.3211C6.91177 16.2567 6.83427 16.0821 6.75706 15.9082C6.72422 15.8342 6.69143 15.7603 6.65295 15.6951L6.6027 15.6101L6.60267 15.6101C6.33351 15.1548 6.06407 14.6991 5.8104 14.2352C5.67278 13.9836 5.48801 13.8811 5.20171 13.8869C4.71124 13.8967 4.22077 13.8947 3.73031 13.8928C3.54905 13.892 3.36779 13.8913 3.18652 13.8912C2.31655 13.8902 1.73095 13.307 1.72999 12.4395C1.7294 11.9799 1.72969 11.5205 1.72998 11.0611C1.73041 10.3929 1.73083 9.72466 1.72855 9.05628C1.72614 8.42257 2.16835 8.01838 2.91418 8.09922C2.96721 8.10515 2.99652 8.14081 3.02545 8.17601C3.03406 8.18649 3.04264 8.19692 3.05179 8.20652L3.45522 8.62612L3.45529 8.62619C4.07752 9.27318 4.69972 9.92015 5.31575 10.573C5.45144 10.7168 5.59195 10.7775 5.7873 10.7717C6.05747 10.7633 6.32815 10.7651 6.59879 10.7669H6.59881C6.70028 10.7675 6.80174 10.7682 6.90316 10.7683C7.18802 10.7688 7.25394 10.8338 7.25635 11.1138C7.25731 11.2424 7.25779 11.3066 7.22591 11.3387C7.19407 11.3708 7.12996 11.3708 7.0018 11.3708L6.49809 11.3705H6.498C5.99418 11.3702 5.49029 11.3698 4.98614 11.3727C4.88798 11.3732 4.81965 11.3433 4.7518 11.274C4.47611 10.9912 4.19825 10.7103 3.92043 10.4294L3.92042 10.4294L3.92024 10.4292C3.80585 10.3136 3.69146 10.1979 3.57724 10.0822C3.49496 9.99892 3.40835 9.92578 3.28132 9.94069C3.05997 9.9662 2.94882 10.2222 3.0797 10.4041C3.10424 10.4378 3.13215 10.4719 3.16535 10.4955C3.49592 10.7289 3.59793 11.0431 3.55703 11.442C3.53247 11.6798 3.53887 11.9213 3.54525 12.1624V12.1624C3.54763 12.252 3.55 12.3415 3.55078 12.4308C3.55415 12.8109 3.73603 12.989 4.1128 12.9957C4.40378 13.001 4.69475 13.0078 4.98573 13.0147C5.25244 13.0209 5.51915 13.0272 5.78586 13.0323C5.92973 13.0352 6.03607 13.0852 6.10921 13.2156C6.48139 13.8754 6.85495 14.5344 7.2285 15.1934L7.22854 15.1935C7.4355 15.5586 7.64245 15.9237 7.84916 16.2889C7.85202 16.294 7.8525 16.3009 7.85323 16.3111V16.3111C7.85372 16.3181 7.85433 16.3267 7.8559 16.3375ZM10.7103 16.0751C10.6617 16.1611 10.6116 16.25 10.5582 16.3442C10.6409 16.3442 10.7201 16.3436 10.7969 16.3429C10.9649 16.3415 11.1212 16.3402 11.2771 16.3462C11.3834 16.3505 11.4359 16.3101 11.4859 16.222C11.6457 15.9416 11.8071 15.6622 11.9684 15.3829C12.1927 14.9945 12.4169 14.6062 12.6369 14.2155C12.7654 13.9874 12.9367 13.883 13.2023 13.8868C13.9038 13.897 14.6059 13.895 15.3074 13.8893C16.0951 13.883 16.6981 13.3012 16.7043 12.5256C16.7139 11.3444 16.7096 10.1627 16.7053 8.98097V8.98073C16.7038 8.5929 16.4599 8.26522 16.1072 8.14733C15.9791 8.10479 15.8476 8.10154 15.7153 8.09827C15.692 8.09769 15.6686 8.09712 15.6452 8.09632C15.535 8.09247 15.4581 8.12375 15.3801 8.20603C15.007 8.59872 14.6323 8.9899 14.2576 9.38105C13.8688 9.78698 13.48 10.1929 13.0931 10.6004C12.9814 10.7183 12.864 10.7741 12.7004 10.7707C12.3365 10.7634 11.9723 10.7657 11.608 10.768C11.5642 10.7683 11.5205 10.7685 11.4768 10.7688C11.2636 10.7702 11.1881 10.8487 11.1813 11.0628C11.1808 11.0829 11.1815 11.1031 11.1823 11.1233C11.1835 11.1573 11.1847 11.1913 11.1799 11.2245C11.1626 11.3462 11.2145 11.3741 11.3305 11.3732C12.0325 11.3683 12.7346 11.3679 13.4361 11.3736C13.5487 11.3746 13.6243 11.339 13.7008 11.2601C14.0176 10.9337 14.3377 10.6106 14.6578 10.2875C14.7218 10.2229 14.7859 10.1583 14.8498 10.0937C15.0308 9.91085 15.1958 9.88968 15.332 10.0283C15.4585 10.1572 15.4364 10.3285 15.2699 10.4984C15.2464 10.5224 15.2232 10.5466 15.2 10.5709C15.136 10.6378 15.072 10.7047 15.0029 10.7654C14.9143 10.8429 14.8826 10.9295 14.884 11.0479C14.8907 11.5156 14.8907 11.9838 14.8855 12.4515C14.8816 12.8085 14.6935 12.988 14.3388 12.9947C14.1081 12.9991 13.8773 13.0045 13.6465 13.0099C13.3196 13.0175 12.9927 13.0251 12.6658 13.0299C12.4974 13.0323 12.3915 13.1016 12.3087 13.2493C11.9601 13.8721 11.6077 14.4929 11.2553 15.1134C11.1266 15.34 10.998 15.5666 10.8695 15.7933C10.8169 15.886 10.7646 15.9788 10.7103 16.0751Z" fill="#007BFF" />
            <path fillRule="evenodd" clipRule="evenodd" d="M12.8537 3.67286C12.8585 1.63217 11.2413 0.00385623 9.20492 6.78523e-06C7.22246 -0.00384266 5.5927 1.63073 5.58596 3.63003C5.57827 5.61586 7.21572 7.26487 9.19819 7.26824C11.1989 7.2716 12.8489 5.64906 12.8537 3.67286ZM12.1565 3.34903C12.2215 3.34277 12.2624 3.33603 12.2494 3.2831C12.169 2.70232 11.9664 2.19901 11.6195 1.75632C11.5786 1.70479 11.5565 1.72139 11.5195 1.74929C11.5161 1.75187 11.5126 1.75455 11.5088 1.75728C11.3448 1.87806 11.2038 1.87758 11.0902 1.76546C10.9771 1.65383 10.9742 1.50755 11.0984 1.34828C11.1436 1.29054 11.1412 1.26744 11.0864 1.2251C10.6504 0.888751 10.1586 0.688099 9.61492 0.610629C9.54707 0.601005 9.51098 0.60726 9.50424 0.69676C9.49077 0.883939 9.36711 0.998941 9.21265 0.994129C9.06252 0.989799 8.948 0.878165 8.93597 0.700128C8.9302 0.614959 8.90132 0.600043 8.82867 0.610148C8.28445 0.686655 7.7922 0.885383 7.35722 1.22365C7.30717 1.26263 7.29226 1.2838 7.33989 1.34587C7.465 1.50707 7.4626 1.65094 7.3524 1.76354C7.24221 1.87613 7.09401 1.8795 6.93474 1.7568C6.87796 1.71301 6.85438 1.71157 6.81108 1.76739C6.47425 2.20334 6.27408 2.69558 6.19613 3.23884C6.1865 3.30476 6.18939 3.34421 6.28082 3.35047C6.4704 3.36394 6.58444 3.48472 6.58059 3.63918C6.57674 3.78931 6.46511 3.90575 6.28803 3.91922C6.2072 3.925 6.1841 3.94617 6.19517 4.02364C6.27312 4.56689 6.47184 5.05962 6.80867 5.49557C6.84765 5.5461 6.87122 5.56005 6.9333 5.51241C7.09642 5.38731 7.23788 5.39067 7.35048 5.50231C7.46211 5.61394 7.46548 5.75926 7.34182 5.91997C7.29611 5.97916 7.30236 6.00274 7.35529 6.04364C7.79124 6.38094 8.28445 6.57871 8.82722 6.65859C8.89892 6.66917 8.92971 6.65666 8.93549 6.57005C8.94848 6.38431 9.07311 6.26739 9.22756 6.27268C9.37721 6.27797 9.4927 6.39057 9.50424 6.56764C9.51002 6.65089 9.53504 6.67013 9.6101 6.65907C10.1529 6.57919 10.6466 6.38287 11.082 6.04508C11.1326 6.0061 11.147 5.98349 11.0994 5.92142C10.9742 5.7583 10.9767 5.61539 11.0873 5.50375C11.1985 5.39116 11.3438 5.38731 11.5045 5.51049C11.5642 5.5562 11.5882 5.55091 11.6296 5.4975C11.9669 5.06155 12.1652 4.56882 12.2441 4.02557C12.2552 3.95146 12.2373 3.925 12.1536 3.91874C11.9751 3.90575 11.8644 3.79123 11.8591 3.6411C11.8538 3.48616 11.9698 3.36683 12.1565 3.34903Z" fill="#007BFF" />
            <path fillRule="evenodd" clipRule="evenodd" d="M15.9186 7.23356C16.765 7.25329 17.4203 6.6369 17.4381 5.80446C17.455 5.00955 16.8184 4.3537 16.01 4.33349C15.2367 4.31424 14.5626 4.95854 14.5472 5.73132C14.5308 6.54163 15.1463 7.21576 15.9186 7.23356ZM16.855 5.79098C16.8569 5.30691 16.4772 4.9263 15.9922 4.9263C15.5091 4.9263 15.1246 5.3098 15.1246 5.79098C15.1242 6.25484 15.5168 6.65085 15.9816 6.65566C16.4561 6.66047 16.853 6.26735 16.855 5.79098Z" fill="#007BFF" />
            <path fillRule="evenodd" clipRule="evenodd" d="M2.43925 4.33399C1.64867 4.33591 1.00581 4.98021 1.00004 5.77609C0.994265 6.571 1.63327 7.22781 2.41856 7.23406C3.23175 7.2408 3.8852 6.61142 3.89241 5.81506C3.90011 4.9908 3.25341 4.33206 2.43925 4.33399ZM2.46424 4.92632C1.97343 4.92247 1.58753 5.29443 1.58416 5.77416C1.58079 6.25534 1.96092 6.64654 2.44066 6.65569C2.90741 6.66483 3.31545 6.26112 3.31496 5.79004C3.31448 5.31656 2.93435 4.93017 2.46424 4.92632Z" fill="#007BFF" />
            <path fillRule="evenodd" clipRule="evenodd" d="M8.3319 3.25503C8.44641 3.34513 8.55809 3.433 8.46146 3.59445C8.45857 4.08237 8.82427 4.41968 9.29053 4.39033C9.7106 4.3629 10.0311 3.95678 9.96467 3.51602C9.94975 3.41786 9.97044 3.36782 10.0412 3.30863C10.2583 3.1277 10.4718 2.9425 10.6852 2.75737C10.73 2.71848 10.7749 2.6796 10.8197 2.64075C10.9939 2.49014 11.0218 2.33184 10.902 2.18941C10.7856 2.05083 10.6167 2.05035 10.4439 2.19614C10.1826 2.41652 9.92232 2.63835 9.66682 2.86547C9.59223 2.93187 9.52872 2.95256 9.43104 2.91262C9.28861 2.8544 9.13559 2.85729 8.99268 2.91503C8.90222 2.95112 8.84159 2.93283 8.77326 2.86931C8.64575 2.75094 8.51295 2.63835 8.37822 2.52864C8.23579 2.41316 8.0693 2.42085 7.95959 2.54115C7.84507 2.66674 7.85902 2.83948 7.99905 2.97036C8.06166 3.02885 8.12723 3.08414 8.19276 3.1394C8.21888 3.16142 8.24499 3.18344 8.27091 3.20566C8.29053 3.22249 8.31126 3.2388 8.3319 3.25503ZM9.04273 3.63535C9.0437 3.7388 9.11587 3.7927 9.215 3.81243C9.3146 3.79607 9.38918 3.74169 9.39111 3.64016C9.39303 3.53045 9.32182 3.45587 9.21019 3.45924C9.10914 3.46213 9.04177 3.53286 9.04273 3.63535Z" fill="#007BFF" />
        </svg>
    },

    { title: "Call", achieved: 0, committed: 150, Icons: <i className="fa-solid fa-phone"></i> },
    { title: "Partner", achieved: 0, committed: 27, Icons: <i className="fa-solid fa-user-group"></i> },
    { title: "Revenue", achieved: 0, committed: 860000, Icons: <i className="fa-solid fa-wallet"></i> }
];

const allCommitLogs = [
    {
        date: "02/12/2024",
        userID: "Vipul",
        Calls: {
            committed: 10,
            achieved: 10
        },
        revenue: {
            committed: 100000,
            achieved: 50000
        },
        partner: {
            committed: 10,
            achieved: 5
        },
        visits: {
            committed: 10,
            achieved: 5
        }
    },
    {
        date: "02/04/2024",
        userID: "Soumya Nayak",
        Calls: {
            committed: 10,
            achieved: 5
        },
        revenue: {
            committed: 100000,
            achieved: 50000
        },
        partner: {
            committed: 10,
            achieved: 5
        },
        visits: {
            committed: 10,
            achieved: 5
        }
    },
    {
        date: "02/02/2024",
        userID: "Asha",
        Calls: {
            committed: 10,
            achieved: 0
        },
        revenue: {
            committed: 100000,
            achieved: 50000
        },
        partner: {
            committed: 10,
            achieved: 5
        },
        visits: {
            committed: 10,
            achieved: 0
        }
    },
    {
        date: "28/12/2024",
        userID: "Soumya Nayak",
        Calls: {
            committed: 10,
            achieved: 5
        },
        revenue: {
            committed: 100000,
            achieved: 50000
        },
        partner: {
            committed: 10,
            achieved: 0
        },
        visits: {
            committed: 10,
            achieved: 0
        }
    },
];


const Commit = ({searchQuery}) => {
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const totalPages = Math.ceil(allCommitLogs.length / itemsPerPage);
    const [activeTab, setActiveTab] = useState("Daily"); // State to manage active tab

    // Add state for date filters
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Pagination logic
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };


    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = allCommitLogs.slice(startIndex, startIndex + itemsPerPage);

    // Filter current items based on date range and active tab
    const filteredItems = currentItems.filter(log => {
        const logDate = new Date(log.date.split('/').reverse().join('-')); // Convert to Date object
        const start = new Date(startDate);
        const end = new Date(endDate);
        const isTabActive = (activeTab === "Daily") || // Show all data for Daily
                            (activeTab === "Weekly" && logDate >= new Date(new Date().setDate(new Date().getDate() - 7)) && logDate <= new Date()) || 
                            (activeTab === "Monthly" && logDate >= new Date(new Date().setMonth(new Date().getMonth() - 1)) && logDate <= new Date());
        
        // Update filtering logic to only apply date range if both dates are selected
        const isDateInRange = (startDate && endDate) ? (logDate >= start && logDate <= end) : true;

        // Include search query filtering
        const isSearchMatch = searchQuery ? log.userID.toLowerCase().includes(searchQuery.toLowerCase()) : true;

        return isTabActive && isDateInRange && isSearchMatch;
    });
    
    // Render pagination buttons
    const renderPagination = () => {
        return generatePaginationButtons(currentPage, totalPages, handlePageChange);
    };


    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1); // Reset to first page when changing tabs
    };

    // Download csv function
    const handleDownload = () => {
        const headers = [
            { key: 'date', label: 'Date' },
            { key: 'userID', label: 'User ID' },
            { key: 'CallsCommitted', label: 'Calls Committed' },
            { key: 'CallsAchieved', label: 'Calls Achieved' },
            { key: 'RevenueCommitted', label: 'Revenue Committed' },
            { key: 'RevenueAchieved', label: 'Revenue Achieved' },
            { key: 'PartnerCommitted', label: 'Partner Committed' },
            { key: 'PartnerAchieved', label: 'Partner Achieved' },
            { key: 'VisitsCommitted', label: 'Visits Committed' },
            { key: 'VisitsAchieved', label: 'Visits Achieved' }
        ];

        const formattedData = filteredItems.map(log => ({
            date: log.date,
            userID: log.userID,
            CallsCommitted: log.Calls.committed,
            CallsAchieved: log.Calls.achieved,
            RevenueCommitted: log.revenue.committed,
            RevenueAchieved: log.revenue.achieved,
            PartnerCommitted: log.partner.committed,
            PartnerAchieved: log.partner.achieved,
            VisitsCommitted: log.visits.committed,
            VisitsAchieved: log.visits.achieved,
        }));

        downloadAsExcel({
            data: formattedData,
            headers,
            filename: 'commit_logs.xlsx',
            sheetName: 'Commit Logs'
        });
    };

    return (
        <div className="commit-container">
            <div className="commit-card-container">
                {data.map((card, index) => (
                    <div key={index} className="card  border-radius box-shadow commit-page-card">
                        <div className="card-header commit-card-header">
                            <span className="card-title" style={{ fontSize: "18px" }}>{card.title}</span>
                            <span className="card-date icn" style={{ color: card.title === "Call" || card.title === "Partner" ? "#00BFA5" : card.title === "Revenue" ? "var(--primary-color)" : "inherit" }}>
                                {card.Icons}
                            </span>
                        </div>
                        <div className="card-header commit-card-header">
                            <span className="card-title">Achieved</span>
                            <span className="card-date">{card.achieved}</span>
                        </div>
                        <div className="card-header commit-card-header">
                            <span className="card-title">Committed</span>
                            <span className="card-date">{card.committed}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="call-manager" style={{ marginTop: 20 }}>
                <div className="call-manager-filters">
                    <div className="commit-page-tabs">
                        {["Daily", "Weekly", "Monthly"].map((tab) => (
                            <div
                                key={tab}
                                className={`tab ${activeTab === tab ? "active" : ""}`}
                                onClick={() => handleTabClick(tab)}
                            >
                                {tab}
                            </div>
                        ))}
                    </div>

                    <div className="call-manager-date-filters" style={{ gap: 10 }}>
                        <div className="call-manager-filter-section-main-div">
                            <button className="commonButtonCss" style={{ width: 120 }}>
                                <span style={{ paddingRight: 5 }}>
                                    <img src={Icons.filter_icon} alt="filter icon" />
                                </span> Add Filter
                            </button>
                        </div>
                        <div className="call-manager-date-input-wrapper">
                            <label>From</label>
                            <input
                                type="date"
                                placeholder="dd-mm-yyyy"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            <img src={Icons.calendar_icon} alt="calendar" className="call-manager-calendar-icon" />
                        </div>
                        <div className="call-manager-date-input-wrapper">
                            <label>To</label>
                            <input
                                type="date"
                                placeholder="dd-mm-yyyy"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                            <img src={Icons.calendar_icon} alt="calendar" className="call-manager-calendar-icon" />
                        </div>

                        <div className="commit-download-button">
                            <button className="commonButtonDownload" onClick={handleDownload}>
                                <span style={{ paddingRight: 5 }}>
                                    <img src={Icons.download_icon} alt="download" />
                                </span> Download
                            </button>
                        </div>
                    </div>
                </div>

                <div className="company-management-container" style={{ marginTop: -10, width: 'calc(100% + 10px)' }}>
                    <div className="company-management-table company-management-table-css" style={{ width: '100%' }}>
                        <table className="box-shadow border-radius">

                            <thead>
                                <tr>
                                    <th>Commit Date</th>
                                    <th>User ID</th>
                                    <th>Call</th>
                                    <th>Revenue</th>
                                    <th>Partner</th>
                                    <th>Visits</th>
                                </tr>
                            </thead>

                            <tbody>

                                {filteredItems.map((log, index) => (
                                    <tr key={index}>
                                        <td style={{ color: "var(--black-color)" }}>{log.date}</td>
                                        <td style={{ color: "var(--black-color)" }}>{log.userID}</td>
                                        <td style={{ lineHeight: 0.5 }}>
                                            <p style={{ color: "var(--primary-color)" }}>
                                                Committed: {log.Calls.committed}
                                            </p>
                                            <p style={{ color: log.Calls.achieved > 0 ? "var(--green-color)" : "var(--red-color)" }}>
                                                Achieved: {log.Calls.achieved}
                                            </p>
                                        </td>
                                        <td style={{ lineHeight: 0.5 }}>
                                            <p style={{ color: "var(--primary-color)" }}>
                                                Committed: {log.revenue.committed}
                                            </p>
                                            <p style={{ color: log.revenue.achieved > 0 ? "var(--green-color)" : "var(--red-color)" }}>
                                                Achieved: {log.revenue.achieved}
                                            </p>
                                        </td>
                                        <td style={{ lineHeight: 0.5 }}>
                                            <p style={{ color: "var(--primary-color)" }}>
                                                Committed: {log.partner.committed}
                                            </p>
                                            <p style={{ color: log.partner.achieved > 0 ? "var(--green-color)" : "var(--red-color)" }}>
                                                Achieved: {log.partner.achieved}
                                            </p>
                                        </td>
                                        <td style={{ lineHeight: 0.5 }}>
                                            <p style={{ color: "var(--primary-color)" }}>
                                                Committed: {log.visits.committed}
                                            </p>
                                            <p style={{ color: log.visits.achieved > 0 ? "var(--green-color)" : "var(--red-color)" }}>
                                                Achieved: {log.visits.achieved}
                                            </p>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>

                {/* Pagination Section */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: -5, paddingBottom: 10 }}>
                    <div className="call-manager-row-per-page">
                        Rows per page:
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1); // Reset to first page when changing items per page
                            }}
                        >
                            <option value={6}>6</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                    <div className="pagination-container" style={{ marginTop: -10 }}>{renderPagination()}</div>
                </div>
            </div>
        </div>
    );
};

export default Commit;