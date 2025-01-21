import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { CatchRateOutputNoticeDto } from "@/dto/CatchRateOutputDto";

export default function HeadlessUiAlert({ messages }: { messages: CatchRateOutputNoticeDto[] }) {
    return (
        <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
                <div className="shrink-0">
                    <ExclamationTriangleIcon aria-hidden="true" className="size-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Attention!</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                        <p>
                            {messages.map((message, index) => {
                                return (
                                    <span key={index} className="block">
                                        {message.message}
                                    </span>
                                );
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
