import streamlit as st
import html
import time

st.set_page_config(layout="wide")

st.title("From Sid, To the Love of My Life")

if "count" not in st.session_state:
    st.session_state.count = 0

if "message_1_shown" not in st.session_state:
    st.session_state.message_1_shown = False

if "message_2_shown" not in st.session_state:
    st.session_state.message_2_shown = False

if "message_3_shown" not in st.session_state:
    st.session_state.message_3_shown = False

if "message_4_shown" not in st.session_state:
    st.session_state.message_4_shown = False

if "message_5_shown" not in st.session_state:
    st.session_state.message_5_shown = False

with open("ascii.txt", "r") as file:
    ascii_art = file.read()


styles = """
<style>
.ascii {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
               "Liberation Mono", "Courier New", monospace;
  white-space: pre;           /* preserve spaces & newlines, no wrapping */
  font-size: 5px;            /* adjust as needed */
  line-height: 1;           /* tighter vertical spacing */
  letter-spacing: 0.1px;        /* tweak horizontal spacing if needed */
  font-variant-ligatures: none; /* avoid ligatures that can distort art */
  text-align: center;
}
</style>
"""


def write_ascii_art(ascii_art):
    st.markdown(styles, unsafe_allow_html=True)
    st.markdown(f'<div class="ascii">{html.escape(ascii_art)}</div>', unsafe_allow_html=True)
    st.write("\n")


def text_generator(text: str):
    for char in text.split():
        yield char + " "
        time.sleep(0.05)


def show_message(message: str, button: bool, key: str):
    if button or st.session_state[key]:
        with st.container():
            with st.chat_message("user", avatar="🦥"):
                if not st.session_state[key]:
                    st.write_stream(text_generator(message))
                    st.session_state[key] = True
                else:
                    st.write(message)


show_message("Good morning pineapple! An Yêu có biết hôm nay là ngày gì khum?", True, "message_1_shown")


# Second message
with st.container(horizontal_alignment="right"):
    resp_1 = st.button("Hôm nay là 20/10 - ngày Phụ Nữ Việt Nam!", key="resp_1")
show_message(
    "Em yêu của ai mà giỏi thía xD Nhân ngày 20 tháng 10, Sid chúc An Yêu của Sid luôn luôn tìm được niềm vui trong mọi thứ An làm! Sau tất cả thì mình sẽ chỉ lưu lại được những kỉ niệm vui vẻ, vậy nên hãy cứ tận hưởng mọi thứ, từ nhỏ nhất như gấp được 1 chiếc áo sau 1 ngày dài, cho đến những điều lớn lao như tết tóc cài hoa cho 1 em bé ở Đồng Nai!",
    resp_1,
    "message_2_shown",
)

# Third message
if st.session_state["message_2_shown"]:
    with st.container(horizontal_alignment="right"):
        resp_2 = st.button("An sẽ ghi nhớ ak!!!", key="resp_2")

    show_message(
        "Không chỉ vậy, Sid chúc An hãy luôn tự tin và tự hào về bản thân, vì An là một trong những người thông minh, trách nhiệm, hiếu học, cần cù chăm chỉ nhất mà Sid biết. Không có việc gì trên đời này mà An không làm được cả ✨ An thực sự giỏi hơn An nghĩ rất nhìu đó!!!!!",
        resp_2,
        "message_3_shown",
    )


# Fourth message
if st.session_state["message_3_shown"]:
    with st.container(horizontal_alignment="right"):
        resp_3 = st.button("An cũng tin là như vậy!!!!", key="resp_3")
    show_message(
        "Sid cũng mong An sẽ luôn tiếp tục chăm sóc bản thân thật tốt, chăm sóc những khoảng thời gian riêng cho những sở thích của mình, chăm sóc cho sức khỏe bằng cách tập thể dục chạy bộ thường xuyên nhưng vẫn luôn khởi động giãn cơ thật kỹ, chăm sóc cách nhìn bản thân để An thật nhẹ nhàng đi cùng chính mình qua thật nhiều những cảm xúc khó khăn, và chăm sóc thật tận tâm những mối quan hệ thân thiết xung quanh mình ❤️‍🔥",
        resp_3,
        "message_4_shown",
    )

# Fifth message
if st.session_state["message_4_shown"]:
    with st.container(horizontal_alignment="right"):
        resp_4 = st.button("Chắc chắn rùi!!!", key="resp_4")
    show_message(
        "Cuối cùng, Sid chúc em yêu của Sid sẽ luôn luôn tin tưởng bản thân, tin rằng An sẽ vượt qua được mọi điều gian nan trước mắt. Dù Sid biết An sẽ tự làm được mọi thứ, Sid vẫn sẽ luôn ở bên hỗ trợ và cổ vũ An để làm cho hành trình ấy của An dễ dàng hơn 1 xíu 💑 Sid đã, đang và vẫn sẽ luôn rất tự hào về An. Sid yêu an nhất trần đời!!!",
        resp_4,
        "message_5_shown",
    )

if st.session_state["message_5_shown"]:
    with st.chat_message("user", avatar="🦥"):
        st.write_stream(text_generator(" Chúc bé yêu có 1 ngày 20/10 thật vui vẻ nhe!"))

    with st.container(horizontal_alignment="center"):
        with st.spinner("Converting my love to art..."):
            time.sleep(3)
            with open("ascii.txt", "r") as file:
                ascii_art = file.read()
            write_ascii_art(ascii_art)
