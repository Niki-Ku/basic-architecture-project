import { ReactComponent as ArrowDownFull } from "../../assets/icons/ArrowDownFull.svg";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

const TermsOfUsePage = () => {

  return(
    <div className="bg-white text-black-default pt-8 pb-12 flex justify-center">
      <div className="px-3 max-w-[1248px]">
        <div className="flex items-center relative">
          <ul className="grow flex mb-8">
            <li className="flex items-center">
              <ArrowDownFull className="w-5 h-5 mr-2 rotate-90" />
            </li>
            <li>
              <Link to="/faq" className="hover:underline hover:text-black-70">Back to Help Home</Link>
            </li>
          </ul>
          <div className="mb-8 self-start">
            <Button label="Print" variant="secondary" icon="PrinterIcon" onClick={() => window.print()}></Button>
          </div>
        </div>
        <div>
          <h1 className="text-[32px] md:text-[40px] font-extrabold">Netflix Terms of Use</h1>
          <p>
            Netflix provides a personalized subscription service that allows our members to access entertainment content (“Netflix content”) over the Internet on certain Internet-connected TVs, computers and other devices ("Netflix ready devices").
          </p>
          <p>
            The Netflix service is provided to you by Netflix International B.V. These Terms of Use govern your use of our service. As used in these Terms of Use, "Netflix service", "our service" or "the service" means the personalized service provided by Netflix for discovering and accessing Netflix content, including all features and functionalities, recommendations and reviews, our websites, and user interfaces, as well as all content and software associated with our service. References to ‘you’ in these Terms of Use indicate the member who created the Netflix account and whose payment method is charged.
          </p>
          <ol className="list-decimal pl-4">
            <li className="mt-8">
              <p>
                <strong className="">Membership</strong>
                <br />
                <br />
                <p>
                  1.1. Your Netflix membership will continue until terminated. To use the Netflix service you must have Internet access and a Netflix ready device, and provide us with one or more Payment Methods. “Payment Method” means a current, valid, accepted method of payment, as may be updated from time to time, and which may include payment through your account with a third party. Unless you cancel your membership before your billing date, you authorize us to charge the subscription fee for the next billing cycle to your Payment Method (see "Cancellation" below).
                </p>
                <br />
                <p>
                  1.2. We may offer a number of subscription plans, including subscriptions offered by third parties in conjunction with the provision of their own products and services. We are not responsible for the products and services provided by such third parties. Some subscription plans may have differing conditions and limitations, which will be disclosed at your sign-up or in other communications made available to you. You can find specific details regarding your Netflix subscription by visiting the netflix.com website and clicking on the "Account" link available at the top of the pages under your profile name.
                </p>
              </p>
            </li>
            <li className="mt-8">
              <p>
                <strong>Promotional Offers.</strong>
                 We may from time to time offer special promotional offers, plans or memberships (“Offers”). Offer eligibility is determined by Netflix at its sole discretion and we reserve the right to revoke an Offer and put your account on hold in the event that we determine you are not eligible. Members of households with an existing or recent Netflix membership may not be eligible for certain introductory Offers. We may use information such as device ID, method of payment or an account email address used with an existing or recent Netflix membership to determine Offer eligibility. The eligibility requirements and other limitations and conditions will be disclosed when you sign-up for the Offer or in other communications made available to you.
              </p>
            </li>
            <li className="mt-8">
              <p>
                <strong>Billing and Cancellation</strong>
                <br />
                <br />
                  3.1. <span className="underline">Billing Cycle.</span>
                   The subscription fee for the Netflix service and any other charges you may incur in connection with your use of the service, such as taxes and possible transaction fees, will be charged to your Payment Method on the specific payment date indicated on the "Account" page. The length of your billing cycle will depend on the type of subscription plan that you choose when you signed-up for the service. In some cases your payment date may change, for example if your Payment Method has not successfully settled, when you change your subscription plan or if your paid subscription began on a day not contained in a given month. Visit the netflix.com website and click on the "Billing details" link on the "Account" page to see your next payment date. We may authorize your Payment Method in anticipation of subscription or service-related charges through various methods, including authorizing it for up to approximately one month of service as soon as you register. If you signed up for Netflix using your account with a third party as a Payment Method, you can find the billing information about your Netflix subscription by visiting your account with the applicable third party.
                  <br />
                  <br />
                  3.2. <span className="underline"> Payment Methods.</span>
                  To use the Netflix service you must provide one or more Payment Methods. You authorize us to charge any Payment Method associated to your account in case your primary Payment Method is declined or no longer available to us for payment of your subscription fee. You remain responsible for any uncollected amounts. If a payment is not successfully settled, due to expiration, insufficient funds, or otherwise, and you do not cancel your account, we may suspend your access to the service until we have successfully charged a valid Payment Method. For some Payment Methods, the issuer may charge you certain fees, such as foreign transaction fees or other fees relating to the processing of your Payment Method. Local tax charges may vary depending on the Payment Method used. Check with your Payment Method service provider for details.
                  <br />
                  <br />
                  3.3. <span className="underline">Updating your Payment Methods..</span>
                  You can update your Payment Methods by going to the "Account" page. We may also update your Payment Methods using information provided by the payment service providers. Following any update, you authorize us to continue to charge the applicable Payment Method(s).
                  <br />
                  <br />
                  3.4. <span className="underline">Cancellation.</span>
                  You can cancel your Netflix membership at any time, and you will continue to have access to the Netflix service through the end of your billing period. To the extent permitted by the applicable law, payments are non-refundable and we do not provide refunds or credits for any partial membership periods or unused Netflix content. To cancel, go to the "Account" page and follow the instructions for cancellation. If you cancel your membership, your account will automatically close at the end of your current billing period. To see when your account will close, click "Billing details" on the "Account" page. If you signed up for Netflix using your account with a third party as a Payment Method and wish to cancel your Netflix membership, you may need to do so through such third party, for example by visiting your account with the applicable third party and turning off auto-renew, or unsubscribing from the Netflix service through that third party.
                  <br />
                  <br />
                  3.5. <span className="underline">Changes to the Price and Subscription Plans.</span>
                  We may change our subscription plans and the price of our service from time to time. We will notify you at least one month before any price changes or changes to your subscription plan will become effective. If you do not wish to accept the price change or change to your subscription plan, you can cancel your membership before the change takes effect.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
};

export default TermsOfUsePage;