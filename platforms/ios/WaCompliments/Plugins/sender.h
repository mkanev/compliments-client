#import <Cordova/CDV.h>
#import <Foundation/Foundation.h>
#import <MessageUI/MessageUI.h>


@interface sender : CDVPlugin <MFMessageComposeViewControllerDelegate>

- (void)sms:(CDVInvokedUrlCommand*)command ;

@end
