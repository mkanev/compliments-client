#import "sender.h"
#import <Cordova/CDV.h>

@implementation sender

- (void)sms:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    NSString* echo = nil;
    if ([command.arguments count]) {
        echo = [command.arguments objectAtIndex:0];
    }
    
    if (echo != nil && [echo length] > 0) {
        NSString *text = [command.arguments objectAtIndex:0];
        NSString *phone = [command.arguments objectAtIndex:1];
        NSArray *recipents = @[phone];
        
        if(![MFMessageComposeViewController canSendText]) {
            UIAlertView *warningAlert = [[UIAlertView alloc] initWithTitle:@"Error" message:@"Your device doesn't support SMS!" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil];
            [warningAlert show];
            return;
        }
        
        MFMessageComposeViewController *messageController = [[MFMessageComposeViewController alloc] init];
        messageController.messageComposeDelegate = self;
        if (![phone  isEqual: @""]) {
            [messageController setRecipients:recipents];
        }
        [messageController setBody:text];
        
        UIWindow *window = [UIApplication sharedApplication].keyWindow;
        UIViewController *rootViewController = window.rootViewController;
        [rootViewController presentViewController:messageController animated:YES completion:nil];
        
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:echo];
        
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)messageComposeViewController:(MFMessageComposeViewController *)controller didFinishWithResult:(MessageComposeResult)result {
    [controller dismissViewControllerAnimated:YES completion:nil];
}

@end
