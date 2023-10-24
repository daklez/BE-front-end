import React from "react";

export default function AccountSupport() {
    return (
        <>  
            <section className="section-title">
                <h1>Support</h1>
            </section>
            <section id="support-form" className="money-move-form">
                <form> 
                    <label htmlFor="subject">Subject:</label>
                    <input type="number" name="subject" placeholder="Subject" />
                    <label htmlFor="message">Message:</label>
                    <textarea name="message" id="message" cols="30" rows="10" placeholder="Message" ></textarea>
                    <input type="submit" value="Create Ticket" />
                    <p>We will be adressing your ticket as soon as possible</p>
                </form>
            </section>  
            <section id="support-open-ticket" className="history">
                <div>
                    <h2>Tickets</h2>
                    <p><i class="fa-solid fa-circle-plus"></i>New Ticket</p>  
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Created</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={5}>No Tickets</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </>
    )
}