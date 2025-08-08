import {Button} from "@/components/Button/Button.tsx";
import {ButtonColors} from "@/components/Button/ButtonColors.tsx";
import {ButtonStates} from "@/components/Button/ButtonStates.tsx";
import {useTimer} from "@/hooks/useTimer.ts";

interface IEmailBlockProps {
    time: string;
}

export function EmailConfirmForm(props: IEmailBlockProps) {
    const [hours, minutes, rest] = props.time.split(':');
    const {timer} = useTimer({
        increment: false,
        second: parseInt(rest.split('.')[0]),
        minute: parseInt(minutes),
        hour: parseInt(hours)
    });
    const isTimerActive = !!timer;

    return (
        <form className="email-block">
            <span className="title">
                <h1>Подтвердите адрес электронной почты</h1>
            </span>
            <div className="email-block-message">
                {isTimerActive
                    ? `На вашу почту было отправлено сообщение с ссылкой для завершения регистрации. 
                        Отправить письмо повторно можно будет через ${timer}`
                    : 'Вы снова можете отправить письмо с подтверждением'}
            </div>
            <Button
                color={ButtonColors.White}
                state={isTimerActive ? ButtonStates.Disabled : ButtonStates.Active}
                style={{width: '100%'}}>
                Отправить Email
            </Button>
        </form>
    );
}